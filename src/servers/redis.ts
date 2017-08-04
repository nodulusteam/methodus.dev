const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodResult, MethodError, MethodEvent, MethodMessage } from '../response';
import { MethodulusClassConfig, MethodType } from '../config';

import { BaseServer } from './base';
import { logger } from '../logger';
const redis = require('redis');
import { fp } from '../fp';
const redis_addr = '//192.168.99.100:32768';
const metadataKey = 'methodulus';

export class Redis extends BaseServer {
    classRouters: Methodulus.Router[];
    options: any;
    constructor(options) {
        super();
        this.options = options;
    }

    useClass(classType) {
        new RedisRouter(classType);

    }
    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {
            let pub = redis.createClient(this.options.server);
            logger.log('redis client created ');
            pub.publish('event-bus', JSON.stringify(methodEvent));
            logger.log('published event', methodEvent);
            resolve(methodEvent);
        });

    }

    async _send(functionArgs, methodinformation, paramsMap) {
        console.debug(functionArgs, methodinformation);
        return new Promise((resolve, reject) => {
            let pub = redis.createClient(this.options.server);
            let sub = redis.createClient(this.options.client);
            var corr = generateUuid();
            sub.subscribe(corr);
            sub.on('message', (destination, msg) => {
                if (corr == destination) {
                    console.info('recieved the call result', msg);
                    let m: MethodResult | MethodError | any = fp.maybeJson(msg);
                    if (m.statusCode && m.error)
                        reject(m);
                    else
                        resolve(m);
                }
            });

            //  amqpConnect().then((conn) => {

            //  conn.createChannel().then((ch) => {
            var q = methodinformation.name;
            let methodMessage = new MethodMessage();
            methodMessage.to = methodinformation.propertyKey;
            methodMessage.metadata = methodinformation;
            methodMessage.message = paramsMap;
            methodMessage.args = functionArgs;
            methodMessage.correlationId = corr;

            pub.publish(methodinformation.name, JSON.stringify(methodMessage));
            // let stringMessage = JSON.stringify(methodMessage);

            // ch.assertQueue('', { exclusive: true }).then((q) => {
            //     var corr = generateUuid();
            //     ch.consume(q.queue, (msg) => {

            //         if (msg.properties.correlationId == corr) {
            //             resolve(fp.maybeJson(msg.content.toString()));

            //             // console.log(' [.] Got %s', msg.content.toString());
            //             //setTimeout(function() { conn.close(); process.exit(0) }, 500);
            //         }
            //     }, { noAck: true });

            //     ch.sendToQueue(methodinformation.name,
            //         new Buffer(stringMessage),
            //         { correlationId: corr, replyTo: q.queue });
            // });
            // });


            // conn.createChannel().then((ch) => {
            //     var q = methodinformation.name;
            //     let methodMessage = new MethodMessage();
            //     methodMessage.to = methodinformation.propertyKey;
            //     methodMessage.metadata = methodinformation;
            //     methodMessage.message = paramsMap;
            //     methodMessage.args = functionArgs;
            //     let stringMessage = JSON.stringify(methodMessage);
            //     ch.assertQueue(q, { durable: false });
            //     // Note: on Node 6 Buffer.from(msg) should be used
            //     ch.sendToQueue(q, new Buffer(stringMessage));
            //     resolve(q);
            // });


            // })




        });
    }
}


function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}




export class RedisServer {
    connection: any = null;
    constructor() {
        // amqpConnect().then((connection) => {
        //     this.connection = connection


        // });
    }


}
export class RedisRouter implements Methodulus.Router {
    public router: any;
    constructor(obj: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;
        let pub = redis.createClient(redis_addr);
        let sub = redis.createClient(redis_addr);


        //amqpConnect().then((conn) => {
        //  conn.createChannel().then((ch) => {
        let q = methodulus.name;
        sub.subscribe(q);
        //extract metadata for class and method

        let config = global.methodulus.server.config;
        let methodinformation: MethodulusClassConfig = config.classes.get(methodulus.name);


        let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, proto) || {};
        if (methodinformation.methodType !== MethodType.Local)
            existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);


        if (proto.methodulus._events && Object.keys(proto.methodulus._events).length > 0) {
            let eventsub = redis.createClient(redis_addr);
            eventsub.subscribe('event-bus');
            eventsub.on('message', async (destination, msg) => {
                let parsedMessage = fp.maybeJson(msg) as MethodEvent;
                if (proto.methodulus._events[parsedMessage.name]) {
                    let pkey = proto.methodulus._events[parsedMessage.name].propertyKey;
                    let result = await proto[pkey](parsedMessage.value);
                    console.log('the result in the router after the call is', result);

                }


            });
        }

        sub.on('message', async (destination, msg) => {
            let parsedMessage = fp.maybeJson(msg) as MethodMessage;
            console.debug('running local method', parsedMessage.to);


            let result = await proto[parsedMessage.to](...parsedMessage.args);
            console.log('the result in the router after the call is', result);

            pub.publish(parsedMessage.correlationId, JSON.stringify(result));
        });
    }
}


