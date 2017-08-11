
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { fp } from '../fp';
import { amqpConnect } from './amqp';
import { BaseServer } from './base';
import { logger, Log, LogClass } from '../log/';
import { MethodType, MethodulusClassConfig } from '../config';
import { MethodResult, MethodError, MethodEvent, MethodMessage, generateUuid } from '../response';
const metadataKey = 'methodulus';

@LogClass()
export class MQ extends BaseServer {
    _app: any;
    constructor(port, httpServer) {
        super();
    }

    @Log()
    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {
            amqpConnect().then((conn) => {
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
            amqpConnect().then((conn) => {

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

                            if (msg.properties.correlationId == corr) {
                                resolve(fp.maybeJson(msg.content.toString()));

                                // console.log(' [.] Got %s', msg.content.toString());
                                //setTimeout(function() { conn.close(); process.exit(0) }, 500);
                            }
                        }, { noAck: true });

                        ch.sendToQueue(methodinformation.name,
                            new Buffer(stringMessage),
                            { correlationId: corr, replyTo: q.queue });
                    });
                });
            });
        });
    }
}

@LogClass()
export class MQRouter {
    public router: any;
    constructor(obj: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;
        let config = global.methodulus.server.config;
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
                logger.log('registering events bus for:', Object.keys(proto.methodulus._events));
                amqpConnect().then((conn) => {
                    conn.createChannel().then((ch) => {

                        let exchange = 'event-bus';
                        ch.assertExchange(exchange, 'fanout', { durable: true });
                        ch.assertQueue('', { exclusive: true, durable: true }).then((q) => {
                            ch.bindQueue(q.queue, exchange, '');
                            ch.consume(q.queue, async (msg) => {
                                if (msg.content) {
                                    console.log(" [x] %s", msg.content.toString());
                                    console.log('event message has arrived', msg.fields.routingKey);
                                    logger.log('msg string is', msg.content.toString());
                                    //parse message
                                    try {
                                        let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodEvent;
                                        if (proto.methodulus._events[parsedMessage.name]) {
                                            let pkey = proto.methodulus._events[parsedMessage.name].propertyKey;
                                            await proto[pkey](parsedMessage.value); //no results for an event                                          

                                        }
                                    } catch (error) {

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
            amqpConnect().then((conn) => {
                conn.createChannel().then((ch) => {
                    let q = methodulus.name;
                    ch.assertQueue(q, { durable: false }).then((q) => {
                        // ch.assertQueue(q, { durable: false });
                        ch.prefetch(1);
                        console.log(' [x] Awaiting RPC requests on', q.queue);
                        ch.consume(q.queue,   async (msg) => {
                            console.log('got message', msg);

                            if (msg.content) {
                                console.log('got message', msg.content.toString());
                                //parse message
                                try {
                                    let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodMessage;
                                    let result = await proto[parsedMessage.to](...parsedMessage.args);
                                    console.log('the local result is', result);
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