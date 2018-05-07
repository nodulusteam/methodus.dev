const excludedProps = ['constructor'];

import 'reflect-metadata';
import { MethodusConfig, MethodDescriptor, MethodType, ServerType, MethodusConfigurations } from '../config';
import { MethodResult, MethodError, MethodEvent } from '../response';
import { Servers } from '../servers/serversList';
import { fp } from '../fp';
import { logger, Log, LogClass } from '../log';
import { RestParser, RestResponse, Verbs } from '../rest';
import { ClassContainer } from '../class-container';

import { ConfigHelper } from '../decorators/configuration';
const correlator = require('correlation-id');

let methodMetadataKey = 'methodus';
let metadataKey = 'params';

function mergeMetadata(methodus) {
    let config = MethodusConfigurations.get();
    let methodinformation = config.classes.get(methodus.name);
    return Object.assign({}, methodus, methodinformation);
}


/** the @Method decorator registers the model with the odm
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */
const METHODLOG = 'methodus::Method';

export function Method(verb: Verbs, route: string, middlewares?: any[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target.methodus = target.methodus || { _events: {}, _descriptors: {} }
        if (middlewares) {
            middlewares = middlewares;
        }
        let metaObject = Object.assign({}, { verb, route, propertyKey, middlewares, params: [] });
        if (target.methodus._descriptors[propertyKey]) {
            metaObject = Object.assign(metaObject, { params: target.methodus._descriptors[propertyKey].params });
        }


        Reflect.defineMetadata(methodMetadataKey, metaObject, target, propertyKey);
        target.methodus._descriptors[propertyKey] = metaObject as MethodDescriptor;
        let paramsMap: any[] = metaObject.params;
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        });
        // save a reference to the original method
        let originalMethod = descriptor.value;

        let classes = {};

        descriptor.value = async function (...args: any[]) {
            validateServerIsRunning();
            //extract metadata for class and method
            let configName = target.name;
            if (!configName && target.constructor)
                configName = target.constructor.name;

            let config = Servers.classes[configName];

            //we will return a MethodResult or a MEthodError
            let methodResult: MethodResult | MethodError | any = null;
            let proto = fp.maybeProto(this);

            //try to get the method metadata from the Relection API.
            let methodus: any = target.methodus;
            if (!methodus) {//if the target dont contain the methodus metadaat, try to get it from the Reflection API
                methodus = Reflect.getOwnMetadata(methodMetadataKey, target, propertyKey) || {};
            }

            let existingClassMetadata: any = ClassContainer.get(methodus.name);

            //merge the configuration object
            Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);

            let functionArgs: any[] = [];
            let sendFlag = false;

            //rest paramters should be parsed differntly
            const parser = new RestParser(args, paramsMap, functionArgs);
            let ParserResponse = parser.parse();

            //acquire the method information from the config classes map
            let completeConfiguration = Object.assign({}, methodus, config);

            let methodType = MethodType.Local;//we default to local

            if (methodus) {
                let configurationKey = methodus.name.replace('@tmla-tiles/', '@tmla-contracts/');
                let configurationBlock = ConfigHelper.get(configurationKey);
                if (!configurationBlock) {
                    configurationBlock = ConfigHelper.get(methodus.name);
                }
                if (configurationBlock) {
                    Object.assign(completeConfiguration, {
                        methodType: configurationBlock.transport,
                        resolver: () => configurationBlock.resolver
                    });
                }
            }

            if (completeConfiguration && completeConfiguration.methodType)//if methodinformation exists we use the mehtod from it.
                methodType = completeConfiguration.methodType;

            // run and store the result
            let restHeaders = null;
            try {
                let server: ServerType | null = null;
                let i = 0;
                const mappedArgs = paramsMap.map((param) => {
                    return { [param.name || param.from]: ParserResponse.args[param.index] }
                });

                logger.info(`Method::call`, methodType, originalMethod.name, ...mappedArgs);
                switch (methodType) {
                    case MethodType.Mock:
                        methodResult = new MethodResult(methodus._mocks[propertyKey]);
                        break;
                    case MethodType.Local:
                        methodResult = await originalMethod.apply(this, ParserResponse.args);
                        break;
                    case MethodType.Http:
                        server = ServerType.Express;
                        break;
                    case MethodType.Socket:
                        server = ServerType.Socket;
                        break;
                    case MethodType.MQ:
                        server = ServerType.RabbitMQ;
                        break;
                    case MethodType.Redis:
                        server = ServerType.Redis;
                        break;
                    case MethodType.Kafka:
                        server = ServerType.Kafka;
                        break;
                }

                if (server === ServerType.Express) {
                    methodResult = new MethodResult(Servers.send(server, ParserResponse.args, completeConfiguration, paramsMap, ParserResponse.securityContext))

                } else if (server) {
                    methodResult = await Servers.send(server, ParserResponse.args, completeConfiguration, paramsMap, ParserResponse.securityContext)

                }

            } catch (error) {
                error.statusCode = error.statusCode || 500;
                logger.error(this, error);

                if (ParserResponse.isRest) {
                    new RestResponse(args, error, restHeaders);
                } else {
                    throw (error);
                }

            }

            if (methodResult && ParserResponse.isRest) {
                new RestResponse(args, methodResult, restHeaders);
                return;
            }
            else {
                if (methodResult !== null && methodResult !== undefined && methodResult.result !== null && methodResult.result !== undefined) {
                    const requestResult = await methodResult.result;
                    try {
                        if (Buffer.isBuffer(requestResult)) {
                            const bufferedResult = new Buffer(requestResult).toString();
                            if (typeof bufferedResult === 'string') {
                                try {
                                    methodResult = new MethodResult(JSON.parse(bufferedResult));
                                } catch (error) {
                                    //not json result
                                    methodResult = bufferedResult;
                                }
                            }
                        } else {
                            if (requestResult.result === undefined) {
                                methodResult = new MethodResult(requestResult);
                            }
                            else {
                                methodResult = requestResult;
                            }
                        }
                    } catch (error) {
                        error.statusCode = error.statusCode || 500;
                        logger.error(this, error);
                        throw (error);
                    }
                }
                logger.info(`Method::OK`, '<==', methodType, originalMethod.name);
                //log.trace(`Method::OK`, '<==',  methodType, originalMethod.name);


                return methodResult;
            }
        };
        return descriptor;
    }
}

function validateServerIsRunning() {
    if (!Servers)
        throw (new Error(`methodus server is not running, did you miss a 'run' statement?`))
}


