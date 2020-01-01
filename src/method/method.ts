import 'reflect-metadata';
import { ClassContainer } from '../class-container';
import { MethodType, TransportType } from '../interfaces';
import { logger } from '../log';
import { MethodError, MethodResult, MethodResultStatus, ResponseParser } from '../response';
import { Servers } from '../servers/serversList';
import { validate } from './validate';


const getClassOf = Function.prototype.call.bind(Object.prototype.toString);


// tslint:disable-next-line:no-namespace
export namespace Methods {

    const methodMetadataKey = 'methodus';

    /** the @Method decorator registers the model with the odm
     *  @param {Verbs} verb - the HTTP verb for the route.
     *  @param {string} route - express route string.
     *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
     */
    export function Method(verb?: string, route?: string, middlewares?: any[]) {
        return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
            return verbBasedMethod(target, propertyKey, descriptor, verb, route, middlewares);
        };
    }

    function verbBasedMethod(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>, verb?: string, route?: string, middlewares?: any[]) {


        target.methodus = target.methodus || {};
        const name = target.name || target.constructor.name;
        target.methodus[name] = target.methodus[name] || { _auth: {}, _events: {}, _descriptors: {} };

        const mTarget = target.methodus[name];

        const metaObject = Object.assign({}, { verb, route, propertyKey, middlewares, params: [] });
        if (mTarget._descriptors[propertyKey]) {
            Object.assign(metaObject, { params: mTarget._descriptors[propertyKey].params });
        }

        Reflect.defineMetadata(methodMetadataKey, metaObject, target, propertyKey);
        mTarget._descriptors[propertyKey] = metaObject as any;
        const paramsMap: any[] = metaObject.params;
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        });
        // save a reference to the original method
        const originalMethod = descriptor.value;
        // const {value} = descriptor;
        const value = async function (...args: any[]) {

            target = this;//Injector.get(target.name);
            validateServerIsRunning();
            // extract metadata for class and method
            let configName = target.name;
            if (!configName && target.constructor && target.constructor.name !== 'Object') {
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
                let client = Servers.clients[configName];



                const existingClassMetadata: any = ClassContainer.get(configName);
                if (client) {


                    // merge the configuration object
                    Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);
                    if (getClassOf(target) === '[object Object]') {// the target is an instance not a class
                        Object.assign(client, this);
                        if (this.credentials) {
                            methodus._auth!.options = this.credentials;
                        }
                    }

                    methodus.resolver = client.resolver;
                    try {

                        const validationResult: any = await validate(args);
                        if (validationResult) {
                            throw new MethodError(validationResult, 422);
                        }

                        if (client.transportType === TransportType.Mock) {
                            // looking for mock mappings
                            if (methodus._mocks && methodus._mocks[propertyKey]) {
                                // mock may be a function or a value
                                if (typeof methodus._mocks[propertyKey] === 'function') {
                                    methodResult = await methodus._mocks[propertyKey].apply(target, args);
                                } else {
                                    methodResult = methodus._mocks[propertyKey];
                                }
                            } else {
                                methodResult = await originalMethod.apply(target, args);
                            }
                        } else {
                            const result = await client.transportType.send(methodus, args, paramsMap);
                            methodResult = new MethodResult(result);
                        }

                        return handleResult(methodResult);
                    } catch (ex) {
                        if (Buffer.isBuffer(ex.error)) {
                            ex.error = ex.error.toString();
                            ex.message = ex.error; // the message property is what we display
                        }
                        try {
                            ex.message = JSON.parse(ex.message).error;
                        } catch (err) {

                        }
                        throw (ex);
                    }
                } else {

                    const result = await originalMethod.apply(target, args);
                    return handleResult(result);
                }

            } else {
                // this is a local call
                const existingClassMetadata: any = ClassContainer.get(methodus.name);
                // merge the configuration object
                Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);

                const functionArgs: any[] = [];
                // acquire the method information from the config classes map
                completeConfiguration = Object.assign({}, methodus, config);
                // rest paramters should be parsed differntly
                parser = new ResponseParser(completeConfiguration.serverType.name);

                ParserResponse = parser.parse(args, paramsMap, functionArgs);

                if (completeConfiguration && completeConfiguration.methodType) {
                    methodType = completeConfiguration.methodType;
                }

                if (completeConfiguration && completeConfiguration.transportType) {
                    methodType = completeConfiguration.transportType;
                }

                // run and store the result
                const restHeaders: any = null;
                try {

                    const validationResult: any = await validate(ParserResponse.args);
                    if (validationResult) {
                        throw new MethodError(validationResult, 422);
                    }

                    const mappedArgs = paramsMap.map((param) => {
                        return { [param.name || param.from]: ParserResponse.args[param.index] };
                    });

                    logger.info('@Method::call', methodType, originalMethod.name, ...mappedArgs);
                    switch (methodType) {
                        case MethodType.Mock:
                            if (methodus._mocks && methodus._mocks[propertyKey]) {
                                if (typeof methodus._mocks[propertyKey] === 'function') {
                                    // tslint:disable-next-line:max-line-length
                                    methodResult = methodus._mocks[propertyKey].apply(target, ParserResponse.args);
                                } else {
                                    methodResult = methodus._mocks[propertyKey];
                                }
                            } else {
                                methodResult = await originalMethod.apply(target, ParserResponse.args);
                            }
                            break;
                        case MethodType.Local:
                            let instanceFromDI = this;// Injector.get(configName) || this;

                            methodResult = await originalMethod.apply(instanceFromDI, ParserResponse.args);
                            break;

                    }
                } catch (error) {

                    error.statusCode = error.statusCode || 500;
                    logger.error(error);
                    if (ParserResponse.isRest) {
                        return parser.response(args, error, restHeaders);
                    } else {

                        throw (error);
                    }
                }
                if (methodResult && ParserResponse.isRest) {
                    return parser.response(args, methodResult, methodResult.headers);
                } else {
                    return handleResult(methodResult);
                }
            }
        };

        descriptor.value = value;
        return descriptor;
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
        }
        return methodResult;
    }
    function validateServerIsRunning() {
        if (!Servers) {
            throw (new Error(`methodus server is not running, did you miss a 'run' statement?`));
        }
    }

}
