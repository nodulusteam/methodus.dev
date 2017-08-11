
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { fp } from '../fp';
import { amqpConnect } from './amqp';
import { BaseServer } from './base';
import { logger, Log, LogClass } from '../log/';
import { MethodType, MethodulusClassConfig } from '../config';
import { MethodResult, MethodError, MethodEvent, MethodMessage, generateUuid } from '../response';

const metadataKey = 'methodulus';

const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage;


@LogClass()
export class Kafka extends BaseServer {
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

                    // ch.assertQueue('event-bus', { exclusive: true }).then((q) => {
                    //     ch.sendToQueue('event-bus',
                    //         new Buffer(JSON.stringify(methodEvent)));
                    //     resolve(methodEvent);
                    // });
                });
            });


        });
    }

    @Log()
    useClass(classType) {
        new KafkaRouter(classType);

    }

    @Log()
    async _send(functionArgs, methodinformation, paramsMap) {

        return new Promise((resolve, reject) => {

            let client = new kafka.KafkaClient({ 'kafkaHost': '192.168.99.100:9092' });
            let producer = new Producer(client);



            let methodMessage = new MethodMessage();
            methodMessage.to = methodinformation.propertyKey;
            methodMessage.metadata = methodinformation;
            methodMessage.message = paramsMap;
            methodMessage.args = functionArgs;
            let stringMessage = JSON.stringify(methodMessage);



            let km = new KeyedMessage('key', 'message'),
                payloads = [
                    { topic: methodinformation.name, messages: stringMessage }
                ];



            client.on('error', function (err) {
                console.log(err);
            });

            producer.on('ready', function () {
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
            });

            producer.on('error', function (err) {
                console.log(err);

            })



            // amqpConnect().then((conn) => {

            //     conn.createChannel().then((ch) => {
            //         var q = methodinformation.name;
            //         let methodMessage = new MethodMessage();
            //         methodMessage.to = methodinformation.propertyKey;
            //         methodMessage.metadata = methodinformation;
            //         methodMessage.message = paramsMap;
            //         methodMessage.args = functionArgs;
            //         let stringMessage = JSON.stringify(methodMessage);

            //         ch.assertQueue('', { exclusive: true }).then((q) => {
            //             var corr = generateUuid();
            //             ch.consume(q.queue, (msg) => {

            //                 if (msg.properties.correlationId == corr) {
            //                     resolve(fp.maybeJson(msg.content.toString()));

            //                     // console.log(' [.] Got %s', msg.content.toString());
            //                     //setTimeout(function() { conn.close(); process.exit(0) }, 500);
            //                 }
            //             }, { noAck: true });

            //             ch.sendToQueue(methodinformation.name,
            //                 new Buffer(stringMessage),
            //                 { correlationId: corr, replyTo: q.queue });
            //         });
            //     });


            //     // conn.createChannel().then((ch) => {
            //     //     var q = methodinformation.name;
            //     //     let methodMessage = new MethodMessage();
            //     //     methodMessage.to = methodinformation.propertyKey;
            //     //     methodMessage.metadata = methodinformation;
            //     //     methodMessage.message = paramsMap;
            //     //     methodMessage.args = functionArgs;
            //     //     let stringMessage = JSON.stringify(methodMessage);
            //     //     ch.assertQueue(q, { durable: false });
            //     //     // Note: on Node 6 Buffer.from(msg) should be used
            //     //     ch.sendToQueue(q, new Buffer(stringMessage));
            //     //     resolve(q);
            //     // });


            // })




        });
    }




}

@LogClass()
export class KafkaRouter {
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
                            //   console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);


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


                                        // let parsedMessage = fp.maybeJson(msg.content.toString()) as MethodMessage;
                                        //let result = await proto[parsedMessage.to](...parsedMessage.args);
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


            let Consumer = kafka.Consumer,
                client = new kafka.Client('192.168.99.100:2181');


            let Kclient = new kafka.KafkaClient({ 'kafkaHost': '192.168.99.100:9092' });
            let producer = new Producer(Kclient);

            // Create topics sync 

            producer.on('ready', function () {
                producer.createTopics([methodulus.name], false, function (err, data) {
                    console.log(err);
                    let consumer = new Consumer(
                        client,
                        [
                            { topic: methodulus.name, partition: 0 }

                        ],
                        {
                            autoCommit: false
                        }
                    );

                    consumer.on('message', async (message) => {
                        let parsedMessage = fp.maybeJson(message.value) as MethodMessage;
                        let result = await proto[parsedMessage.to](...parsedMessage.args);


                    });


                });

            });


        })
    }
}