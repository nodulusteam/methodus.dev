import 'reflect-metadata';
import { Logger } from './logger';
const NodeCache = require('node-cache');



const debugInstance = require('debug')('methodus:throng:cache');
let debug: Logger;
if (debugInstance.enabled) {
    debug = new Logger('methodus:throng:cache', debugInstance);
} else {
    debug = new Logger();
}
export const cacheLog = debug;
// const debug = new Logger('methodus:throng:cache');


const crypto = require('crypto');
const Limit = require('p-limit');


const CACHE_CHECK_PERIOD = process.env.CACHE_CHECK_PERIOD || 60;
const CACHE_DELETE_ON_EXPIRE = process.env.CACHE_DELETE_ON_EXPIRE === 'true' ? true : false;
const CACHE_RELOAD_ON_EXPIRE = process.env.CACHE_RELOAD_ON_EXPIRE === 'true' ? true : false;
const CACHE_USE_CLONES = process.env.CACHE_USE_CLONES === 'true' ? true : false;


const memoryCache = new NodeCache({
    deleteOnExpire: CACHE_DELETE_ON_EXPIRE,
    checkperiod: CACHE_CHECK_PERIOD,
    useClones: CACHE_USE_CLONES
});


debug.info(`CACHE_RELOAD_ON_EXPIRE: ${CACHE_RELOAD_ON_EXPIRE}`);

memoryCache.on('expired', async (key: string, value: CacheItem) => {
    debug.info(`expired key: ${key}, at ${new Date()}`);
    memoryCache.del(key);
    if (CACHE_RELOAD_ON_EXPIRE) {
        value.limiter(async () => {
            debug.info(`executing refresh at: ${new Date()}`);
            return await value.exec(...value.args);
        });
    }
});


debug.info('Cache initiated.');

export const Store = memoryCache;
export interface CacheItem {
    exec: Function;
    args: any;
    value: any;
    hits: number;
    limiter: any;
}

/** the @Cache decorator activates caching using a key, joined from the arguments
 *  @param {ttl} number - the duration of cache in seconds.
 */
export function Cache(ttl: number,
    expireThrottle: number = 1,
    keyLength?: number | Function,
    setCacheFunction?: Function,
    filterCacheFunction?: Function) {
    const limiter = Limit(expireThrottle);
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (process.env.THRONG_OFF && process.env.THRONG_OFF === 'true') {
            debug.info(`Throng is off`);
            return;
        } else {
            debug.info(`Throng cache applied to ${propertyKey}`);
        }

        // save a reference to the original method
        const originalMethod = descriptor.value;
        const valueFunction = async function (...args: any[]) {
            const _self = this;
            let keyArgs = args;
            let finalKey = ''
            if (typeof keyLength === 'number') {
                keyArgs = keyArgs.slice(0, keyLength);
                finalKey = keyArgs.join('-');
            } else if (typeof keyLength === 'function') {
                finalKey = keyLength(args);
            } else {
                finalKey = keyArgs.join('-');
            }

            let shouldCache = true;
            let shouldLook = true

            //when filtered
            if (filterCacheFunction && typeof filterCacheFunction === 'function') {
                debug.info(`applying filterCacheFunction ${propertyKey}`);
                shouldLook = filterCacheFunction(args);
                debug.info(`${propertyKey}  skipping cache ${!shouldLook}`);
            }

            debug.info(`${propertyKey}::args -> ${JSON.stringify(keyArgs)}`);

            let hash = crypto.createHash('md5').update(finalKey).digest('hex');
            const key = `${propertyKey}-${hash}`;
            debug.info(`Getting key ${key}`);

            let cacheResult: CacheItem | undefined = undefined;

            if (shouldLook) {
                try {
                    cacheResult = memoryCache.get(key);
                } catch (error) /* istanbul ignore next */{
                    debug.info(`error getting from cache`);
                    debug.error(error);
                }
            }

            if (!cacheResult || !cacheResult.value) {
                debug.info(`Cache empty for  cache key ${key}`);
                debug.info(`applying method ${propertyKey}`);
                let result = originalMethod.apply(_self, args);
                //
                if (result.then) {
                    debug.info(`resolving promise ${propertyKey}`);
                    try {
                        result = await result;
                    } catch (error) {
                        debug.error(error);
                        throw (error);
                    }

                }

                debug.info(`method ${propertyKey} completed , set to cache ${key}`);
                if (setCacheFunction && typeof setCacheFunction === 'function') {
                    debug.info(`applying setCacheFunction ${propertyKey}`);
                    shouldCache = setCacheFunction(args, result);
                }

                if (result && shouldCache) {
                    const existing = memoryCache.get(key);
                    let hitCounter = 1;
                    if (existing) {
                        hitCounter = existing.hits;
                    }

                    memoryCache.set(key, {
                        exec: valueFunction.bind(_self),
                        args: args,
                        value: result,
                        limiter: limiter,
                        hits: hitCounter
                    }, ttl);

                    debug.info(`set to cache ${key} Ok`);
                } else {
                    debug.info(`not setting to cache ${key} False`);
                }
                return result;
            } else {
                debug.info(`Got record for cache ${key}`);
                debug.info(`increment hits. current value:  ${cacheResult.hits}`);
                cacheResult.hits++;
                return cacheResult.value;
            }
        };
        descriptor.value = valueFunction;
        return descriptor;
    };
}
