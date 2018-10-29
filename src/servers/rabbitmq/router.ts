import 'reflect-metadata';
import { fp } from '../../fp';
import { AMQP, registerHandlers, registerWorkers } from './';
import { logger, LogClass } from '../../log';
import { MethodMessage } from '../../response';
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
    async registerRoutes(proto, methodus) {
        return new Promise((resolve, reject) => {
            const dom = domain.create();
            dom.on('error', () => {
                this.registerRoutes(proto, methodus);
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
                        const qname = methodus.name;
                        ch.assertQueue(qname, { durable: false }).then((q) => {
                            // ch.assertQueue(q, { durable: false });
                            ch.prefetch(1);
                            ch.consume(q.queue, async (msg) => {
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
                        }).catch((error) => {
                            console.log(error);
                        });
                    });
                }).catch((error) => {
                    console.log(error);
                });
            });
        });
    }
}
