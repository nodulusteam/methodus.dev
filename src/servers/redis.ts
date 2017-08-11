const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodResult, MethodError, MethodEvent, MethodMessage } from '../response';
import { MethodulusClassConfig, MethodType } from '../config';

import { BaseServer } from './base';
import { logger, Log, LogClass } from '../log/';
const redis = require('redis');
import { fp } from '../fp';
const redis_addr = '//192.168.99.100:32768';
const metadataKey = 'methodulus';

@LogClass()
export class Redis extends BaseServer {
    classRouters: Methodulus.Router[];
    options: any;
    constructor(options) {
        super();
        this.options = options;
    }

    @Log()
    useClass(classType) {
        new RedisRouter(classType);

    }

    @Log()
    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {
            let pub = redis.createClient(this.options.server);
            logger.log('redis client created ');
            pub.publish('event-bus', JSON.stringify(methodEvent));
            logger.log('published event', methodEvent);
            resolve(methodEvent);
        });

    }

    @Log()
    async publish(pub, methodinformation, methodMessage) {
        pub.publish(methodinformation.name, JSON.stringify(methodMessage));
    }


    @Log()
    async _send(functionArgs, methodinformation, paramsMap) {
        logger.debug(functionArgs, methodinformation);
        return new Promise(async (resolve, reject) => {
            let pub = redis.createClient(this.options.server);
            let sub = redis.createClient(this.options.client);
            var corr = generateUuid();
            sub.subscribe(corr);
            sub.on('message', (destination, msg) => {
                if (corr == destination) {
                    logger.info('recieved the call result', msg);
                    let m: MethodResult | MethodError | any = fp.maybeJson(msg);
                    if (m.statusCode && m.error)
                        reject(m);
                    else
                        resolve(m);
                }
            });

            var q = methodinformation.name;
            let methodMessage = new MethodMessage();
            methodMessage.to = methodinformation.propertyKey;
            methodMessage.metadata = methodinformation;
            methodMessage.message = paramsMap;
            methodMessage.args = functionArgs;
            methodMessage.correlationId = corr;
            await this.publish(pub, methodinformation, methodMessage);

        });
    }
}


function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}



@LogClass()
export class RedisServer {
    connection: any = null;
    constructor() {
        // amqpConnect().then((connection) => {
        //     this.connection = connection


        // });
    }


}

@LogClass()
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


        // let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, proto) || {};
        // //if (methodinformation.methodType !== MethodType.Local)
        // existingClassMetadata.returnMessages = true;
        // Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);


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
            logger.debug('running local method', parsedMessage.to);


            let result = await proto[parsedMessage.to](...parsedMessage.args);
            logger.log('the result in the router after the call is', result);

            pub.publish(parsedMessage.correlationId, JSON.stringify(result));
        });
    }
}


