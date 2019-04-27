
import 'reflect-metadata';
import { fp } from '../../src/fp';
import { AMQP } from './amqp';
import { logger } from '../../src/log';
import { MethodEvent } from '../../src/response';
import * as domain from 'domain';

export async function registerWorkers(proto: any, options: any) {
    return new Promise((resolve, reject) => {
        let foundEvents = false;
        if (proto.methodus._workevents && Object.keys(proto.methodus._workevents).length > 0) {
            logger.log(this, 'registering events bus for:', Object.keys(proto.methodus._workevents));
            const dom = domain.create();
            dom.on('error', () => {
                registerWorkers(proto, options);
            });
            foundEvents = true;
            dom.run(() => {
                AMQP.connect(options).then((conn: any) => {
                    conn.createChannel().then((ch: any) => {
                        let exchangeArr = fp.unique(Object.keys(proto.methodus._workevents)
                            .map((event) => proto.methodus._workevents[event].exchange));
                        if (exchangeArr.length === 0) {
                            exchangeArr = ['event-bus'];
                        }
                        exchangeArr.forEach((exchange: any) => {
                            ch.assertQueue(proto.methodus.workQueueName,
                                { exclusive: false, durable: true }).then((q: any) => {
                                    Object.keys(proto.methodus._workevents).forEach((event: any) => {
                                        ch.bindQueue(q.queue, exchange, proto.methodus._workevents[event].name);
                                    });
                                    ch.prefetch(1);
                                    ch.consume(q.queue, async (msg: any) => {
                                        if (msg && msg.content) {
                                            logger.log(this, ' [x] %s', msg.content.toString());
                                            logger.log(this, 'event message has arrived', msg.fields.routingKey);
                                            logger.log(this, 'msg string is', msg.content.toString());
                                            // parse message
                                            try {
                                                const parsedMessage: MethodEvent =
                                                    fp.maybeJson(msg.content.toString()) as MethodEvent;

                                                if (proto.methodus._workevents[parsedMessage.name]) {
                                                    const pkey = proto.methodus.
                                                        _workevents[parsedMessage.name].propertyKey;
                                                    if (proto[pkey]) {
                                                        const taskStatus = await proto[pkey](parsedMessage.value,
                                                            parsedMessage.name);
                                                        if (taskStatus) {
                                                            ch.ack(msg);
                                                        }
                                                    }

                                                } else {
                                                    // perform a wild card search
                                                    Object.keys(proto.methodus._workevents)
                                                        .forEach(async (eventName) => {
                                                            const eventNameWithoutStar = eventName.replace(/\*/g, '');
                                                            if (parsedMessage.name
                                                                .indexOf(eventNameWithoutStar) === 0) {
                                                                const pkey = proto.methodus.
                                                                    _workevents[eventName].propertyKey;
                                                                if (proto[pkey]) {
                                                                    const taskStatus =
                                                                        await proto[pkey](parsedMessage.value,
                                                                            parsedMessage.name);
                                                                    if (taskStatus) {
                                                                        ch.ack(msg);
                                                                    }
                                                                }
                                                            }
                                                        });
                                                }

                                            } catch (error) {
                                                logger.error(this, error);
                                            }
                                        } else {
                                            logger.error(this, `recieved empty message`);
                                            this.registerEvents(proto);
                                        }
                                    }, { noAck: false });

                                    resolve();
                                });
                        });
                    });
                });
            });
        }
        if (!foundEvents) {
            resolve();
        }
    });

}
