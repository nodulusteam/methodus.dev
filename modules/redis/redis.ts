// <references path='../interfaces/methodus.ts' />
import 'reflect-metadata';
import { MethodResult, MethodError, MethodEvent, MethodMessage } from '../../src/response';
import * as Methodus from '../../src/interfaces/';
import { BaseServer } from '../../src/servers/base';
import { logger, LogClass } from '../../src/log';
const redis = require('redis');
import { fp } from '../../src/fp';
const redis_addr = '//192.168.99.100:32768';
@LogClass(logger)
export class Redis extends BaseServer {
    options: any;
    constructor(options: any) {
        super();
        this.options = options;
    }
    useClass(classType: any) {
        return new RedisRouter(classType);
    }

    async _sendEvent(methodEvent: MethodEvent) {
        return new Promise((resolve, reject) => {
            const pub = redis.createClient(this.options.server);
            logger.log('redis client created ');
            pub.publish('event-bus', JSON.stringify(methodEvent));
            logger.log('published event', methodEvent);
            resolve(methodEvent);
        });

    }
    async publish(pub: any, methodinformation: any, methodMessage: any) {
        pub.publish(methodinformation.name, JSON.stringify(methodMessage));
    }

    async _send(functionArgs: any, methodinformation: any, paramsMap: any) {
        logger.debug(functionArgs, methodinformation);
        return new Promise(async (resolve, reject) => {
            const pub = redis.createClient(this.options.server);
            const sub = redis.createClient(this.options.client);
            const corr = generateUuid();
            sub.subscribe(corr);
            sub.on('message', (destination: any, msg: any) => {
                if (corr === destination) {
                    logger.info('recieved the call result', msg);
                    const m: MethodResult | MethodError | any = fp.maybeJson(msg);
                    if (m.statusCode && m.error) {
                        reject(m);
                    } else {
                        resolve(m);
                    }
                }
            });
            const methodMessage = new MethodMessage(methodinformation.propertyKey,
                paramsMap, methodinformation, functionArgs, corr);
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
}

@LogClass(logger)
export class RedisRouter implements Methodus.Router {
    prefix: string;
    public router: any;
    constructor(obj: any) {
        const proto = fp.maybeProto(obj);
        const methodus = fp.maybeMethodus(proto)[obj.name];

        const pub = redis.createClient(redis_addr);
        const sub = redis.createClient(redis_addr);

        const q = methodus.name;
        sub.subscribe(q);

        if (proto.methodus._events && Object.keys(proto.methodus._events).length > 0) {
            const eventsub = redis.createClient(redis_addr);
            eventsub.subscribe('event-bus');
            eventsub.on('message', async (destination: any, msg: any) => {
                const parsedMessage = fp.maybeJson(msg) as MethodEvent;
                if (proto.methodus._events[parsedMessage.name]) {
                    const pkey = proto.methodus._events[parsedMessage.name].propertyKey;
                    const result = await proto[pkey](parsedMessage.value);
                    console.log('the result in the router after the call is', result);
                }
            });
        }

        sub.on('message', async (destination: any, msg: any) => {
            const parsedMessage = fp.maybeJson(msg) as MethodMessage;
            logger.debug('running local method', parsedMessage.to);
            const result = await proto[parsedMessage.to](...parsedMessage.args);
            logger.log('the result in the router after the call is', result);
            pub.publish(parsedMessage.correlationId, JSON.stringify(result));
        });
    }
}
