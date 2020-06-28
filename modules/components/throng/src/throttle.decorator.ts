import 'reflect-metadata';
import { Logger } from './logger';
const Limit = require('p-limit');

const THROTTLE_GLOBALLY = process.env.THROTTLE_GLOBALLY === 'false' ? false : true;

const debugInstance = require('debug')('methodus:throng:throttle');
let debug: Logger;
if (debugInstance.enabled) {
    debug = new Logger('methodus:throng:throttle', debugInstance);
} else {
    debug = new Logger();
}

export const throttleLog = debug;

export const ThrottleLimit = {
    limit: null
}
/** the @Throttle decorator activates caching using a key, joined from the arguments and hashed
 *  @param {limit} number - the maximum allowed concurrent executions for the method.
 */
export function Throttle(limit: number) {

    if (THROTTLE_GLOBALLY && !ThrottleLimit.limit) {
        ThrottleLimit.limit = Limit(limit);
        debug.info(`Creating a global limiter for (${limit})`);
    }

    const limiter = THROTTLE_GLOBALLY ? ThrottleLimit.limit : Limit(limit);




    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (process.env.THRONG_OFF && process.env.THRONG_OFF === 'true') {
            debug.info(`Throng is off`);
            return;
        } else {
            debug.info(`Throng throttle applied to ${propertyKey}`);
        }



        // save a reference to the original method
        const originalMethod = descriptor.value;
        const value = async function (...args: any[]) {

            debug.info(`${propertyKey}:: >> limits pendingCount:(${limiter.pendingCount}) , activeCount:(${limiter.activeCount})`);

            const _self = this;
            const result = await new Promise(async (resolve, reject) => {
                limiter(async () => {
                    debug.info(`${propertyKey}::executing`);
                    let functionResult = originalMethod.apply(_self, args);
                    debug.info(`${propertyKey}::complete`);
                    if (functionResult.then) {
                        debug.info(`resolving promise ${propertyKey}`);
                        try {
                            functionResult = await functionResult;
                        } catch (error) {
                            reject(error);
                        }
                    }
                    debug.info(`${propertyKey}:: << limits pendingCount:(${limiter.pendingCount}) , activeCount:(${limiter.activeCount})`);

                    resolve(functionResult);
                });
            });
            return result;
        };
        descriptor.value = value;
        return descriptor;
    };
}
