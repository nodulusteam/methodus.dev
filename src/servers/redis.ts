 // <references path='../interfaces/methodus.ts' />
 
 const debug = require('debug')('tmla:methodus');
import 'reflect-metadata';
import { MethodResult, MethodError, MethodEvent, MethodMessage } from '../response';
import { MethodusClassConfig, MethodType } from '../config';

import { BaseServer } from './base';
import { LogLevel, logger, Log, LogClass } from '../log';
const redis = require('redis');
import { fp } from '../fp';
const redis_addr = '//192.168.99.100:32768';
const metadataKey = 'methodus';

@LogClass(logger)
export class Redis extends BaseServer {
    classRouters: Methodus.Router[];
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

            const q = methodinformation.name;
            const methodMessage = new MethodMessage(methodinformation.propertyKey, paramsMap, methodinformation, functionArgs, corr);
            await this.publish(pub, methodinformation, methodMessage);

        });
    }
}


function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}



@LogClass(logger)
export class RedisServer {
    connection: any = null;
    constructor() {
    }
}

@LogClass(logger)
export class RedisRouter implements Methodus.Router {
    public router: any;
    constructor(obj: any) {
        let proto = fp.maybeProto(obj);
        let methodus = fp.maybeMethodus(proto);

        let pub = redis.createClient(redis_addr);
        let sub = redis.createClient(redis_addr);

        let q = methodus.name;
        sub.subscribe(q);



        if (proto.methodus._events && Object.keys(proto.methodus._events).length > 0) {
            let eventsub = redis.createClient(redis_addr);
            eventsub.subscribe('event-bus');
            eventsub.on('message', async (destination, msg) => {
                let parsedMessage = fp.maybeJson(msg) as MethodEvent;
                if (proto.methodus._events[parsedMessage.name]) {
                    let pkey = proto.methodus._events[parsedMessage.name].propertyKey;
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


