
import 'reflect-metadata';
import { fp } from '../../src/fp';
import { MQRouter } from './router';
import { BaseServer } from '../../src/servers/base';
import { logger, LogClass } from '../../src/log';
import { MethodType } from '../../src/interfaces';
import { MethodEvent, MethodMessage, generateUuid } from '../../src/response';
import { AMQP } from './amqp';

@LogClass(logger)
export class MQ extends BaseServer {
    _app: any;
    options: any;
    constructor(options: any) {
        super();
        this.options = options;
    }

    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {

            AMQP.connect(this.options).then((conn: any) => {
                conn.createChannel().then((ch: any) => {
                    const exchangeArr = methodEvent.exchanges || ['event-bus'];
                    exchangeArr.forEach((exchange: any) => {
                        ch.assertExchange(exchange);
                        ch.publish(exchange, methodEvent.name, Buffer.from(JSON.stringify(methodEvent)));
                    });
                });
            });
        });
    }

    useClass(classType: any, methodType: MethodType) {
        if (methodType === MethodType.Local) {
            return new MQRouter(classType, this.options);
        }
        return null;
    }

    async _send(functionArgs: any, methodinformation: any, paramsMap: any) {
        return new Promise((resolve, reject) => {
            AMQP.connect(this.options).then((conn: any) => {
                conn.createChannel().then((ch: any) => {
                    const methodMessage = new MethodMessage(methodinformation.propertyKey, paramsMap,
                        methodinformation, functionArgs);
                    const stringMessage = JSON.stringify(methodMessage);
                    ch.assertQueue('', { exclusive: true, autoDelete: true }).then((q: any) => {
                        const corr = generateUuid();
                        ch.consume(q.queue, (msg: any) => {
                            if (msg.properties.correlationId === corr) {
                                resolve(fp.maybeJson(msg.content.toString()));
                            }
                            return ch.close();
                        }, { noAck: true });
                        ch.sendToQueue(methodinformation.name,
                            new Buffer(stringMessage),
                            { correlationId: corr, replyTo: q.queue });

                    }).catch((error: any) => {
                        logger.error(error);
                    });
                }).catch((error: any) => {
                    logger.error(error);
                });
            }).catch((error: any) => {
                logger.error(error);
            });
        });
    }
}
