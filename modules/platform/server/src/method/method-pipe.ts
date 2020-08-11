import 'reflect-metadata';
import commons, { MethodType, MethodError, MethodResult } from '@methodus/framework-commons';
import injection from '@methodus/framework-injection';
import { Servers } from '../servers/serversList';
import { ResponseParser } from '../response/response-parser';

const methodMetadataKey = 'methodus';
/** the @Method decorator registers route listeners
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */

export function verbBasedMethod(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>, verb?: string, route?: string, middlewares?: Function[]) {
    let methodResult: MethodResult | MethodError | any = null;
    target.methodus = target.methodus || {};
    const name = target.name || target.constructor.name;
    target.methodus[name] = target.methodus[name] || { _auth: {}, _events: {}, _descriptors: {} };

    const mTarget = target.methodus[name];

    let metaObject = Object.assign({}, { verb, route, propertyKey, middlewares, params: [] });
    if (mTarget._descriptors[propertyKey]) {
        metaObject = Object.assign(metaObject, { params: mTarget._descriptors[propertyKey].params });
    }

    Reflect.defineMetadata(methodMetadataKey, metaObject, target, propertyKey);
    mTarget._descriptors[propertyKey] = metaObject;
    const paramsMap: any[] = metaObject.params;
    paramsMap.sort((a, b) => {
        return a.index - b.index;
    });
    // save a reference to the original method
    const originalMethod = descriptor.value;

    // not async
    const value = async function (...args: any[]) {
        validateServerIsRunning();
        // extract metadata for class and method
        let configName = target.name;
        if (!configName && target.constructor) {
            configName = target.constructor.name;
        }
        let methodus: any = mTarget;
        if (!methodus) {
            methodus = Reflect.getOwnMetadata(methodMetadataKey, target, propertyKey) || {};
        }
        const config = Servers.classes[configName];
        if (!config) {
            const client = Servers.clients[configName];
            const existingClassMetadata = injection.ClassContainer.get(configName);
            if (client) {
                // merge the configuration object
                Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);
                methodus.resolver = client.resolver;
                try {
                    const result = await client.transportType.send(methodus, args, paramsMap, []);
                    return result;
                } catch (ex) {
                    if (Buffer.isBuffer(ex.error)) {
                        ex.error = ex.error.toString();
                        throw (ex);
                    }
                }
            } else {
                const result = await originalMethod.apply(this, args);
                return result;
            }

        } else {
            const existingClassMetadata: any = injection.ClassContainer.get(methodus.name);
            // merge the configuration object
            Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);

            const functionArgs: any[] = [];

            let methodType = MethodType.Local; // we default to local
            // rest paramters should be parsed differntly
            const parser = new ResponseParser(methodus.serverType);
            const ParserResponse = parser.parse(args, paramsMap, functionArgs);

            // acquire the method information from the config classes map
            const completeConfiguration = Object.assign({}, methodus, config);

            if (completeConfiguration && completeConfiguration.methodType) {
                // if methodinformation exists we use the mehtod from it.
                methodType = completeConfiguration.methodType;
            }
            // run and store the result
            const restHeaders: any = null;
            try {
                const mappedArgs = paramsMap.map((param) => {
                    return { [param.name || param.from]: ParserResponse.args[param.index] };
                });
                commons.logger.info(`@Method::call`, methodType, originalMethod.name, ...mappedArgs);
                switch (methodType) {
                    case MethodType.Mock:
                        methodResult = new MethodResult(methodus._mocks[propertyKey]);
                        break;
                    case MethodType.Local:
                        methodResult = originalMethod.apply(this, ParserResponse.args);
                        break;
                }
            } catch (error) {
                error.statusCode = error.statusCode || 500;
                commons.logger.error(error);
                if (ParserResponse.isRest) {
                    return parser.response(args, error, restHeaders);
                } else {
                    throw (error);
                }
            }

            if (ParserResponse.isRest) {
                if (methodResult.toString() === '[object Promise]') {
                    methodResult.then((resolvedPromise: any) => {
                        return parser.response(args, resolvedPromise, restHeaders);
                    });
                } else {
                    return parser.response(args, methodResult, restHeaders);
                }
            } else {
                commons.logger.info(`@Method::OK`, methodType, originalMethod.name);
                return methodResult;
            }

        }

    };
    delete descriptor.value;
    delete descriptor.writable;

    descriptor.get = function () {
        // Create an instance of the bound function for the instance.
        // And set an instance property to override the property
        // from the object prototype.
        Object.defineProperty(this, propertyKey, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            value() {
                return value.apply(this, arguments as any);
            },
        });
    }
    return descriptor;
}


function validateServerIsRunning() {
    if (!Servers) {
        throw (new Error(`methodus server is not running, did you miss a 'run' statement?`));
    }
}
