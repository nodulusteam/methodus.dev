import 'reflect-metadata';
import { ClassContainer } from '../class-container';
import { MethodType } from '../interfaces';
import { logger } from '../log';
import { MethodError, MethodResult, MethodResultStatus } from '../response';
import { RestParser, Verbs } from '../rest';
import { Servers } from '../servers/serversList';
const methodMetadataKey = 'methodus';

/** the @Method decorator registers the model with the odm
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */

export function Method(verb: Verbs, route: string, middlewares?: any[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target.methodus = target.methodus || {};
        const name = target.name || target.constructor.name;
        target.methodus[name] = target.methodus[name] || { _events: {}, _descriptors: {} };

        let mTarget = target.methodus[name];

        let metaObject = Object.assign({}, { verb, route, propertyKey, middlewares, params: [] });
        if (mTarget._descriptors[propertyKey]) {
            metaObject = Object.assign(metaObject, { params: mTarget._descriptors[propertyKey].params });
        }

        Reflect.defineMetadata(methodMetadataKey, metaObject, target, propertyKey);
        mTarget._descriptors[propertyKey] = metaObject as any;
        let paramsMap: any[] = metaObject.params;
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        });
        // save a reference to the original method
        const originalMethod = descriptor.value;
        // const {value} = descriptor;
        const value = async function(...args: any[]) {

            if (args && args[args.length - 1] && args[args.length - 1].instruct) {
                mTarget = args[args.length - 1].target;
                target = mTarget;

                metaObject = mTarget._descriptors[propertyKey];
                paramsMap = metaObject.params as any;
                paramsMap.sort((a: any, b: any) => {
                    return a.index - b.index;
                });
            }

            validateServerIsRunning();
            // extract metadata for class and method
            let configName = name;
            if (!configName && target.constructor) {
                configName = target.constructor.name;
            }

            // we will return a MethodResult or a MethodError
            let methodResult: MethodResult | MethodError | any = null;
            // try to get the method metadata from the Relection API.
            let methodus: any = mTarget;
            if (!methodus) {// if the target dont contain the methodus metadaat, try to get it from the Reflection API
                methodus = Reflect.getOwnMetadata(methodMetadataKey, target, propertyKey) || {};
            }
            let ParserResponse: any;
            let parser: any;
            let completeConfiguration: any;
            let methodType = MethodType.Local; // we default to local

            const config = Servers.classes[configName];
            if (!config) {
                const client = Servers.clients[configName];
                const existingClassMetadata: any = ClassContainer.get(configName);
                if (client) {
                    // merge the configuration object
                    Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);
                    methodus.resolver = client.resolver;
                    try {

                        const result = await client.transportType.send(methodus, args, paramsMap, []);
                        methodResult = new MethodResult(result);
                        return handleResult(methodResult);
                    } catch (ex) {
                        if (Buffer.isBuffer(ex.error)) {
                            ex.error = ex.error.toString();
                            throw (ex);
                        }
                    }
                } else {

                    const result = await originalMethod.apply(this, args);
                    methodResult = new MethodResult(result);
                    return handleResult(methodResult);
                }

            } else {
                // this is a local call
                const existingClassMetadata: any = ClassContainer.get(methodus.name);

                // merge the configuration object
                Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);

                const functionArgs: any[] = [];

                // rest paramters should be parsed differntly
                parser = new RestParser(methodus.serverType);
                ParserResponse = parser.parse(args, paramsMap, functionArgs);

                // acquire the method information from the config classes map
                completeConfiguration = Object.assign({}, methodus, config);
                if (completeConfiguration && completeConfiguration.methodType) {
                    methodType = completeConfiguration.methodType;
                }

                // run and store the result
                const restHeaders: any = null;
                try {

                    const mappedArgs = paramsMap.map((param) => {
                        return { [param.name || param.from]: ParserResponse.args[param.index] };
                    });

                    logger.info(`Method::call`, methodType, originalMethod.name, ...mappedArgs);
                    switch (methodType) {
                        case MethodType.Mock:
                            if (methodus._mocks && methodus._mocks[propertyKey]) {
                                if (typeof methodus._mocks[propertyKey] === 'function') {
                                    methodResult = new MethodResult(methodus._mocks[propertyKey](...ParserResponse.args));
                                } else {
                                    methodResult = new MethodResult(methodus._mocks[propertyKey]);
                                }
                            } else {
                                methodResult = await originalMethod.apply(target as any, ParserResponse.args);
                            }
                            break;
                        case MethodType.Local:
                            methodResult = await originalMethod.apply(this as any, ParserResponse.args as any);
                            break;

                    }

                    // if (server === ServerType.Express || server === ServerType.HTTP2) {
                    //     methodResult = new MethodResult(Servers.send(server, ParserResponse.args,
                    //         completeConfiguration, paramsMap, ParserResponse.securityContext));

                    // } else if (server) {
                    //     methodResult = await Servers.send(server, ParserResponse.args,
                    //         completeConfiguration, paramsMap, ParserResponse.securityContext);
                    // }

                } catch (error) {
                    error.statusCode = error.statusCode || 500;
                    logger.error(error);

                    if (ParserResponse.isRest) {
                        return new parser.response(args, error, restHeaders);
                    } else {
                        throw (error);
                    }
                }

                if (methodResult && ParserResponse.isRest) {
                    return new parser.response(args, methodResult, methodResult.headers);
                } else {
                    return handleResult(methodResult);
                }
            }

        };

        delete descriptor.value;
        delete descriptor.writable;

        descriptor.get = function() {
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
        };
        return descriptor;
    };

}

async function handleResult(methodResult: any) {
    if (methodResult !== null && methodResult !== undefined &&
        methodResult.result !== null && methodResult.result !== undefined) {
        try {

            const requestResult = await methodResult.result;
            if (!requestResult) {
                methodResult = {};
            } else {
                if (Buffer.isBuffer(requestResult)) {
                    const bufferedResult = Buffer.from(requestResult).toString();
                    if (typeof bufferedResult === 'string') {
                        try {
                            methodResult = new MethodResult(JSON.parse(bufferedResult));
                        } catch (error) {
                            // not json result
                            methodResult = bufferedResult;
                        }
                    }
                } else {
                    if (requestResult.result === undefined) {
                        methodResult = new MethodResult(requestResult);
                    } else {
                        methodResult = requestResult;
                    }
                }
            }
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            if (error.error && Buffer.isBuffer(error.error)) {
                error.error = Buffer.from(error.error).toString();
            }

            delete error.response;
            delete error.options;
            delete error.message;
            logger.error(error);
            throw new MethodResultStatus(error, error.statusCode);
        }

        return methodResult;
    }
}
function validateServerIsRunning() {
    if (!Servers) {
        throw (new Error(`methodus server is not running, did you miss a 'run' statement?`));
    }
}
