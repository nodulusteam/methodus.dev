

const debug = require('debug')('tmla:methodus:mq');
import 'reflect-metadata';
import { fp } from '../../fp';
import { AMQP, registerHandlers, registerWorkers } from './';
import { logger, Log, LogClass } from '../../log';
import { ConnectionOptions } from '../../config';
import { MethodMessage } from '../../response';
import * as domain from 'domain';

const metadataKey = 'methodus';

@LogClass(logger)
export class MQRouter {
    public router: any;
    options: ConnectionOptions;
    constructor(classType: any, connectionOptions: ConnectionOptions) {
        this.options = connectionOptions;
        let proto = fp.maybeProto(classType);

        // let methodinformation: MethodusClassConfig = config.classes.get(methodus.name);
        let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, proto) || {};
        //if (methodinformation.methodType !== MethodType.Local)
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);
        registerHandlers(proto, this.options);
        registerWorkers(proto, this.options);
    }



    @Log()
    async registerRoutes(proto, methodus) {
        return new Promise((resolve, reject) => {

            var dom = domain.create();
            dom.on('error', () => {
                this.registerRoutes(proto, methodus)
            });

            dom.run(() => {
                AMQP.connect(this.options).then((conn) => {
                    conn.on('error', (error) => {
                        console.log(error);
                        this.registerRoutes(proto, methodus);
                    });
                    conn.on('close', (error) => {
                        console.log(error);
                        this.registerRoutes(proto, methodus);
                    });


                    dom.add(conn);
                    conn.createChannel().then((ch) => {
                        let q = methodus.name;
                        ch.assertQueue(q, { durable: false }).then((q) => {
                            // ch.assertQueue(q, { durable: false });
                            ch.prefetch(1);
                            ch.consume(q.queue, async (msg) => {
                                if (msg && msg.content) {
                                    //parse message
                                    try {
                                        let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodMessage;
                                        if (proto[parsedMessage.to]) {
                                            let result = await proto[parsedMessage.to](...parsedMessage.args);

                                            if (msg.properties) {
                                                ch.sendToQueue(msg.properties.replyTo,
                                                    Buffer.from(JSON.stringify(result)),
                                                    { correlationId: msg.properties.correlationId });

                                                ch.ack(msg);
                                            }
                                        } else {
                                            logger.error(this, `method ${parsedMessage.to} not found in ${proto}`)
                                        }





                                    } catch (error) {
                                        console.error(error);
                                    }
                                } else {
                                    logger.error(this, `recieved empty message`);
                                    this.registerRoutes(proto, methodus)
                                }

                            });


                        }).catch((error) => {
                            console.log(error);
                        });

                    });
                }).catch((error) => {
                    console.log(error);
                });

            });



        })
    }
}