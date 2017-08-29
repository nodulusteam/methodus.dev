
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { fp } from '../fp';
import { AMQP } from './amqp';
import { BaseServer } from './base';
import { logger, Log, LogClass } from '../log/';
import { MethodType, MethodulusClassConfig, MethodulusConfigurations } from '../config';
import { MethodResult, MethodError, MethodEvent, MethodMessage, generateUuid } from '../response';
const metadataKey = 'methodulus';


async function executeAsync(proto, parsedMessage) {
    let result = await proto[parsedMessage.to].call(proto, ...parsedMessage.args);
    return result;
}

@LogClass(logger)
export class MQ extends BaseServer {
    _app: any;


    options: any;
    constructor(options) {
        super();
        this.options = options;
    }

    @Log()
    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {
            AMQP.connect(this.options).then((conn) => {
                conn.createChannel().then((ch) => {
                    ch.assertExchange('event-bus', 'fanout', { durable: true });
                    ch.publish('event-bus', '', new Buffer(JSON.stringify(methodEvent)));
                });
            });
        });
    }


    @Log()
    useClass(classType) {
        new MQRouter(classType, this.options);

    }






    @Log()
    async _send(functionArgs, methodinformation, paramsMap) {
        return new Promise((resolve, reject) => {
            AMQP.connect(this.options).then((conn) => {

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
                            if (msg) {
                                if (msg.properties.correlationId === corr) {
                                    logger.info(this, q.queue, corr);
                                    ch.ack(msg);
                                    ch.deleteQueue(q.queue).then((messageCount) => {
                                        console.log('delete result', messageCount);
                                    });
                                    resolve(fp.maybeJson(msg.content.toString()));
                                }
                            }

                        }, { noAck: false, consumerTag: 'methodulus' }, (err, ok) => {

                            console.log(err, ok);

                        });

                        logger.debug(this, q.queue, corr);

                        ch.sendToQueue(methodinformation.name,
                            new Buffer(stringMessage),
                            { correlationId: corr, replyTo: q.queue });
                    });



                });
            }).catch(error => {

                console.log(error);

            });
        });
    }
}

@LogClass(logger)
export class MQRouter {
    public router: any;
    options: any;
    methodulus: any;
    constructor(obj: any, options) {
        this.options = options;

        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;

        let config = MethodulusConfigurations.get();
        let methodinformation: MethodulusClassConfig = config.classes.get(methodulus.name);
        let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, proto) || {};
        //if (methodinformation.methodType !== MethodType.Local)
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);

        this.methodulus = methodulus;

        this.registerEvents(proto).then(() => {
            this.registerRoutes(proto, methodulus, false)
        })






    }

    @Log()
    async registerEvents(proto) {
        return new Promise((resolve, reject) => {
            if (proto.methodulus._events && Object.keys(proto.methodulus._events).length > 0) {
                logger.log(this, 'registering events bus for:', Object.keys(proto.methodulus._events));
                AMQP.connect(this.options).then((conn) => {
                    conn.createChannel().then((ch) => {
                        let exchange = 'event-bus';
                        ch.assertExchange(exchange, 'fanout', { durable: true });
                        ch.assertQueue('', { exclusive: true, durable: true }).then((q) => {
                            ch.bindQueue(q.queue, exchange, '');
                            ch.consume(q.queue, (msg) => {
                                if (msg.content) {
                                    logger.debug(this, 'msg string is', msg.content.toString());


                                    async function executeAsyncEvent(key, proto, parsedMessage) {
                                        let result = await proto[key].call(proto, parsedMessage.value);
                                        return result;
                                    }


                                    //parse message
                                    try {
                                        let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodEvent;
                                        if (proto.methodulus._events[parsedMessage.name]) {
                                            let pkey = proto.methodulus._events[parsedMessage.name].propertyKey;
                                            executeAsyncEvent(pkey, proto, parsedMessage).then(result => console.log(result)).catch(error => console.log(error));

                                            //  await proto[pkey](parsedMessage.value); //no results for an event                                          

                                        }
                                    } catch (error) {
                                        throw (new MethodError(error));
                                    }
                                }
                            }, { noAck: true });

                            resolve();
                        });
                    });

                }).catch(error => {
                    console.log(error);
                });
            }
            else
                resolve();
        })
    }



    @Log()
    async registerRoutes(proto, methodulus, forceReconnect) {
        return new Promise((resolve, reject) => {
            AMQP.connect(this.options,forceReconnect).then((conn) => {
                conn.createChannel().then((ch) => {


                    ch.on("error", () => {
                        setTimeout(() => {
                            this.registerRoutes(proto, methodulus, true);
                        }, 1000);
                        console.log("[AMQP] channel closed");
                    });
                    conn.on("close", () => {
                        setTimeout(() => {
                            this.registerRoutes(proto, methodulus, true);
                        }, 1000);
                        console.log("[AMQP] channel closed");
                    });
                    // ch.on("close", () => {
                    //     setTimeout(() => {
                    //         this.registerRoutes(proto, methodulus);
                    //     }, 1000);
                    //     console.log("[AMQP] channel closed");
                    // });


                    let q = methodulus.name;
                    ch.assertQueue(q, { durable: false }).then((q) => {
                        // ch.assertQueue(q, { durable: false });
                        ch.prefetch(1);

                        ch.consume(q.queue, (msg) => {

                            if (msg === null) {
                                //rewire the connection, assure the que and continue
                                return;
                            }

                            if (msg.content) {

                                //parse message
                                try {
                                    let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodMessage;


                                    if (parsedMessage.to) {
                                        if (!proto[parsedMessage.to])
                                            throw (new MethodError(`${parsedMessage.to} not found in prototype, message: ${msg.content.toString()}`));



                                        executeAsync(proto, parsedMessage).then((result) => {
                                            if (result !== undefined) {
                                                if (msg.properties) {
                                                    ch.sendToQueue(msg.properties.replyTo,
                                                        new Buffer(JSON.stringify(result)),
                                                        { correlationId: msg.properties.correlationId });

                                                    ch.ack(msg);
                                                }
                                            } else {
                                                ch.ack(msg);
                                            }


                                        }).catch((error) => {

                                            console.log(error);

                                        });

                                        // let result = await proto[parsedMessage.to].call(proto, ...parsedMessage.args);



                                    }




                                } catch (error) {
                                    console.log(error);
                                }
                            }

                        }, { noAck: false }, (error, ok) => {
                            setTimeout(() => {
                                this.registerRoutes(proto, methodulus, true);
                            }, 1000);
                        });
                        resolve();

                    }).catch((error) => {
                        setTimeout(() => {
                            this.registerRoutes(proto, methodulus, true);
                        }, 1000);
                    });
                }).catch(error => {
                    console.log(error);

                });


            }).catch((error) => {
                setTimeout(() => {
                    this.registerRoutes(proto, methodulus, true);
                }, 1000);

            })
        });

    }
}

