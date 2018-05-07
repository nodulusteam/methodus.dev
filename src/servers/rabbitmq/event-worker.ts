
const debug = require('debug')('tmla:methodus:mq');
import 'reflect-metadata';
import { fp } from '../../fp';
import { AMQP } from './amqp';
import { BaseServer } from '../base';
import { LogLevel, logger, Log, LogClass } from '../../log';
import { MethodType, MethodusClassConfig, ConnectionOptions, MethodusConfigurations } from '../../config';
import { MethodResult, MethodError, MethodEvent, MethodMessage, generateUuid } from '../../response';
import * as domain from 'domain';
 



export async function registerWorkers(proto, options) {

    return new Promise((resolve, reject) => {
        let foundEvents = false;
        if (proto.methodus._workevents && Object.keys(proto.methodus._workevents).length > 0) {
            logger.log(this, 'registering events bus for:', Object.keys(proto.methodus._workevents));
            var dom = domain.create();
            dom.on('error', () => {
                registerWorkers(proto, options)
            });
            foundEvents = true;
            dom.run(() => {
                AMQP.connect(options).then((conn) => {
                    conn.createChannel().then((ch) => {
                        let exchangeArr = _.uniq(Object.keys(proto.methodus._workevents).map(event => proto.methodus._workevents[event].exchange));
                        if (exchangeArr.length === 0) {
                            exchangeArr = ['event-bus'];
                        }
                        exchangeArr.map(exchange => {
                            //  let exchange = proto.methodus.exchange || 'event-bus';

                            ch.assertQueue(proto.methodus.workQueueName, { exclusive: false, durable: true }).then((q) => {
                                Object.keys(proto.methodus._workevents).forEach(event => {
                                    ch.bindQueue(q.queue, exchange, proto.methodus._workevents[event].name);
                                })
                                ch.prefetch(1);
                                ch.consume(q.queue, async (msg) => {
                                    if (msg && msg.content) {
                                        logger.log(this, ' [x] %s', msg.content.toString());
                                        logger.log(this, 'event message has arrived', msg.fields.routingKey);
                                        logger.log(this, 'msg string is', msg.content.toString());
                                        //parse message
                                        try {
                                            let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodEvent;
                                            if (proto.methodus._workevents[parsedMessage.name]) {
                                                let pkey = proto.methodus._workevents[parsedMessage.name].propertyKey;
                                                if (proto[pkey]) {
                                                    const taskStatus = await proto[pkey](parsedMessage.value, parsedMessage.name);
                                                    if (taskStatus) {
                                                        ch.ack(msg);
                                                    }
                                                }

                                            } else {
                                                //perform a wild card search
                                                Object.keys(proto.methodus._workevents).forEach(async eventName => {
                                                    let eventNameWithoutStar = eventName.replace(/\*/g, '')
                                                    if (parsedMessage.name.indexOf(eventNameWithoutStar) === 0) {
                                                        let pkey = proto.methodus._workevents[eventName].propertyKey;
                                                        if (proto[pkey]) {
                                                            const taskStatus = await proto[pkey](parsedMessage.value, parsedMessage.name);
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
                                        this.registerEvents(proto)
                                    }
                                }, { noAck: false });

                                resolve();
                            });


                        })


                    });

                });

            })

        }


        if (!foundEvents) {
            resolve();
        }


    })

}