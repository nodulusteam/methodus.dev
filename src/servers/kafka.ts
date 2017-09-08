
const debug = require('debug')('methodulus');

import { Container } from '../container';



import "reflect-metadata";
import { fp } from '../fp';
import { AMQP } from './amqp';
import { BaseServer } from './base';
import { logger, Log, LogClass } from '../log/';
import { MethodType, MethodulusClassConfig } from '../config';
import { MethodResult, MethodError, MethodEvent, MethodMessage, generateUuid } from '../response';

const metadataKey = 'methodulus';

const kafka = Container.get('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage;


@LogClass(logger)
export class Kafka extends BaseServer {
    _app: any;
    options: any;
    constructor(connectionOptions) {
        super();
        this.options = connectionOptions
    }

    @Log()
    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {
            AMQP.connect(this.options).then((conn) => {
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
        new KafkaRouter(classType, this.options);

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
        });
    }
}

@LogClass(logger)
export class KafkaRouter {
    public router: any;
    options:any;
    constructor(obj: any,options:any) {
        this.options = options;

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