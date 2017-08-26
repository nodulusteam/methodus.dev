
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { fp } from '../fp';
import { AMQP } from './amqp';
import { BaseServer } from './base';
import { logger, Log, LogClass } from '../log/';
import { MethodType, MethodulusClassConfig,MethodulusConfigurations } from '../config';
import { MethodResult, MethodError, MethodEvent, MethodMessage, generateUuid } from '../response';
const metadataKey = 'methodulus';

@LogClass(logger)
export class MQ extends BaseServer {
    _app: any;
    constructor(port, httpServer) {
        super();
    }

    @Log()
    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {
            AMQP.connect().then((conn) => {
                conn.createChannel().then((ch) => {
                    ch.assertExchange('event-bus', 'fanout', { durable: true });
                    ch.publish('event-bus', '', new Buffer(JSON.stringify(methodEvent)));
                });
            });
        });
    }


    @Log()
    useClass(classType) {
        new MQRouter(classType);

    }

    @Log()
    async _send(functionArgs, methodinformation, paramsMap) {
        return new Promise((resolve, reject) => {
            AMQP.connect().then((conn) => {

                conn.createChannel().then((ch) => {

                    var q = methodinformation.name;
                    let methodMessage = new MethodMessage();
                    methodMessage.to = methodinformation.propertyKey;
                    methodMessage.metadata = methodinformation;
                    methodMessage.message = paramsMap;
                    methodMessage.args = functionArgs;
                    let stringMessage = JSON.stringify(methodMessage);

                    ch.assertQueue('', { exclusive: true }).then((q) => {

                        var corr = generateUuid();
                        ch.consume(q.queue, (msg) => {

                            if (msg.properties.correlationId === corr) {
                                logger.info(this, q.queue, corr);
                                resolve(fp.maybeJson(msg.content.toString()));
                            }
                        }, { noAck: true });

                        logger.debug(this, q.queue, corr);

                        ch.sendToQueue(methodinformation.name,
                            new Buffer(stringMessage),
                            { correlationId: corr, replyTo: q.queue });
                    });
                });
            });
        });
    }
}

@LogClass(logger)
export class MQRouter {
    public router: any;
    constructor(obj: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;
        let config = MethodulusConfigurations.get();
        let methodinformation: MethodulusClassConfig = config.classes.get(methodulus.name);
        let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, proto) || {};
        //if (methodinformation.methodType !== MethodType.Local)
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);


        this.registerEvents(proto).then(() => {
            this.registerRoutes(proto, methodulus)
        })






    }

    @Log()
    async registerEvents(proto) {
        return new Promise((resolve, reject) => {
            if (proto.methodulus._events && Object.keys(proto.methodulus._events).length > 0) {
                logger.log(this, 'registering events bus for:', Object.keys(proto.methodulus._events));
                AMQP.connect().then((conn) => {
                    conn.createChannel().then((ch) => {

                        let exchange = 'event-bus';
                        ch.assertExchange(exchange, 'fanout', { durable: true });
                        ch.assertQueue('', { exclusive: true, durable: true }).then((q) => {
                            ch.bindQueue(q.queue, exchange, '');
                            ch.consume(q.queue, async (msg) => {
                                if (msg.content) {
                                    logger.debug(this, 'msg string is', msg.content.toString());
                                    //parse message
                                    try {
                                        let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodEvent;
                                        if (proto.methodulus._events[parsedMessage.name]) {
                                            let pkey = proto.methodulus._events[parsedMessage.name].propertyKey;
                                            await proto[pkey](parsedMessage.value); //no results for an event                                          

                                        }
                                    } catch (error) {
                                        throw (new MethodError(error));
                                    }
                                }
                            }, { noAck: true });

                            resolve();
                        });
                    });

                });
            }
            else
                resolve();

        })

    }
    @Log()
    async registerRoutes(proto, methodulus) {
        return new Promise((resolve, reject) => {
            AMQP.connect().then((conn) => {
                conn.createChannel().then((ch) => {
                    let q = methodulus.name;
                    ch.assertQueue(q, { durable: false }).then((q) => {
                        // ch.assertQueue(q, { durable: false });
                        ch.prefetch(1);

                        ch.consume(q.queue, async (msg) => {


                            if (msg.content) {

                                //parse message
                                try {
                                    let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodMessage;
                                    let result = await proto[parsedMessage.to].call(proto, ...parsedMessage.args);

                                    if (msg.properties) {
                                        ch.sendToQueue(msg.properties.replyTo,
                                            new Buffer(JSON.stringify(result)),
                                            { correlationId: msg.properties.correlationId });

                                        ch.ack(msg);
                                    }




                                } catch (error) {
                                    console.log(error);
                                }
                            }

                        });


                    }).catch((error) => {
                        console.log(error);
                    });

                });
            });


        })
    }
}