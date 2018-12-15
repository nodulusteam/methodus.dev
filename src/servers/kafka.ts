
import 'reflect-metadata';
import { fp } from '../fp';
import { AMQP } from './rabbitmq';
import { BaseServer } from './base';
import { logger, LogClass } from '../log';
import { MethodEvent, MethodMessage } from '../response';
const metadataKey = 'methodus';
const kafka = require('kafka-node'),
    Producer = kafka.Producer;

@LogClass(logger)
export class Kafka extends BaseServer {
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
                    ch.assertExchange('event-bus', 'fanout', { durable: true });
                    ch.publish('event-bus', '', Buffer.from(JSON.stringify(methodEvent)));
                });
            });
        });
    }

    useClass(classType) {
        const router = new KafkaRouter(classType, this.options);
    }

    async _send(functionArgs, methodinformation, paramsMap) {
        return new Promise((resolve, reject) => {
            const client = new kafka.KafkaClient({ kafkaHost: '192.168.99.100:9092' });
            const producer = new Producer(client);

            const methodMessage = new MethodMessage(methodinformation.propertyKey,
                paramsMap, methodinformation, functionArgs);
            const stringMessage = JSON.stringify(methodMessage);

            const
                payloads = [
                    { topic: methodinformation.name, messages: stringMessage },
                ];

            client.on('error', (err) => {
                console.log(err);
            });

            producer.on('ready', () => {
                producer.send(payloads, (err, data) => {
                    console.log(data);
                });
            });

            producer.on('error', (err) => {
                console.log(err);
            });
        });
    }
}

@LogClass(logger)
export class KafkaRouter {
    public router: any;
    options: any;
    constructor(obj: any, options: any) {
        this.options = options;
        const proto = fp.maybeProto(obj);
        const methodus = fp.maybeMethodus(proto);
        const existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, proto) || {};

        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);

        this.registerEvents(proto).then(() => {
            this.registerRoutes(proto, methodus);
        });
    }

    async registerEvents(proto) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    async registerRoutes(proto, methodus) {
        return new Promise((resolve, reject) => {

            const Consumer = kafka.Consumer,
                client = new kafka.Client('192.168.99.100:2181');
            const Kclient = new kafka.KafkaClient({ kafkaHost: '192.168.99.100:9092' });
            const producer = new Producer(Kclient);
            // Create topics sync
            producer.on('ready', () => {
                producer.createTopics([methodus.name], false, (err, data) => {
                    console.log(err);
                    const consumer = new Consumer(
                        client,
                        [
                            { topic: methodus.name, partition: 0 },

                        ],
                        {
                            autoCommit: false,
                        },
                    );

                    consumer.on('message', async (message) => {
                        const parsedMessage = fp.maybeJson(message.value) as MethodMessage;
                        await proto[parsedMessage.to](...parsedMessage.args);
                    });
                });
            });
        });
    }
}
