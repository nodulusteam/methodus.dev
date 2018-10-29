
import 'reflect-metadata';
import { fp } from '../../fp';
import { MQRouter } from './router';
import { BaseServer } from '../base';
import { logger, LogClass } from '../../log';
import { MethodType } from '../../interfaces';
import { MethodEvent, MethodMessage, generateUuid } from '../../response';
import { AMQP } from './amqp';

@LogClass(logger)
export class MQ extends BaseServer {
    _app: any;
    options: any;
    constructor(options) {
        super();
        this.options = options;
    }

    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {

            AMQP.connect(this.options).then((conn) => {
                conn.createChannel().then((ch) => {
                    const exchangeArr = methodEvent.exchanges || ['event-bus'];
                    exchangeArr.forEach((exchange) => {
                        ch.assertExchange(exchange);
                        ch.publish(exchange, methodEvent.name, Buffer.from(JSON.stringify(methodEvent)));
                    });
                });
            });
        });
    }

    useClass(classType, methodType: MethodType) {
        if (methodType === MethodType.Local) {
            const router = new MQRouter(classType, this.options);
        }
    }

    async _send(functionArgs, methodinformation, paramsMap) {
        return new Promise((resolve, reject) => {
            AMQP.connect(this.options).then((conn) => {
                conn.createChannel().then((ch) => {
                    const methodMessage = new MethodMessage(methodinformation.propertyKey, paramsMap,
                        methodinformation, functionArgs);
                    const stringMessage = JSON.stringify(methodMessage);
                    ch.assertQueue('', { exclusive: true, autoDelete: true }).then((q) => {
                        const corr = generateUuid();
                        ch.consume(q.queue, (msg) => {
                            if (msg.properties.correlationId === corr) {
                                resolve(fp.maybeJson(msg.content.toString()));
                            }
                            return ch.close();
                        }, { noAck: true });
                        ch.sendToQueue(methodinformation.name,
                            new Buffer(stringMessage),
                            { correlationId: corr, replyTo: q.queue });

                    }).catch((error) => {
                        console.error(error);
                    });
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error) => {
                console.error(error);
            });
        });
    }
}
