import 'reflect-metadata';
import { fp } from '../../src/fp';
import { AMQP, registerHandlers, registerWorkers } from './';
import { logger, LogClass } from '../../src/log';
import { MethodMessage } from '../../src/response';
import * as domain from 'domain';
import { ConnectionOptions } from './connection-options';
const metadataKey = 'methodus';

@LogClass(logger)
export class MQRouter {
    public router: any;
    options: ConnectionOptions;
    constructor(classType: any, connectionOptions: ConnectionOptions) {
        this.options = connectionOptions;
        const proto = fp.maybeProto(classType);
        const existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, proto) || {};
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);
        registerHandlers(proto, this.options);
        registerWorkers(proto, this.options);
    }
    async registerRoutes(proto: any, methodus: any) {
        return new Promise((resolve, reject) => {
            const dom = domain.create();
            dom.on('error', () => {
                this.registerRoutes(proto, methodus);
            });

            dom.run(() => {
                AMQP.connect(this.options).then((conn: any) => {
                    conn.on('error', (error: any) => {
                        console.log(error);
                        this.registerRoutes(proto, methodus);
                    });
                    conn.on('close', (error: any) => {
                        console.log(error);
                        this.registerRoutes(proto, methodus);
                    });

                    dom.add(conn);
                    conn.createChannel().then((ch: any) => {
                        const qname = methodus.name;
                        ch.assertQueue(qname, { durable: false }).then((q: any) => {
                            // ch.assertQueue(q, { durable: false });
                            ch.prefetch(1);
                            ch.consume(q.queue, async (msg: any) => {
                                if (msg && msg.content) {

                                    try {
                                        const parsedMessage = fp.maybeJson(msg.content.toString()) as MethodMessage;
                                        if (proto[parsedMessage.to]) {
                                            const result = await proto[parsedMessage.to](...parsedMessage.args);

                                            if (msg.properties) {
                                                ch.sendToQueue(msg.properties.replyTo,
                                                    Buffer.from(JSON.stringify(result)),
                                                    { correlationId: msg.properties.correlationId });

                                                ch.ack(msg);
                                            }
                                        } else {
                                            logger.error(this, `method ${parsedMessage.to} not found in ${proto}`);
                                        }
                                    } catch (error) {
                                        console.error(error);
                                    }
                                } else {
                                    logger.error(this, `recieved empty message`);
                                    this.registerRoutes(proto, methodus);
                                }
                            });
                        }).catch((error: any) => {
                            console.log(error);
                        });
                    });
                }).catch((error: any) => {
                    console.log(error);
                });
            });
        });
    }
}
