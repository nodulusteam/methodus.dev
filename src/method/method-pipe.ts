import 'reflect-metadata';
import { MethodDescriptor } from '../config';
import { MethodType, ServerType } from '../interfaces';
import { MethodResult, MethodError } from '../response';
import { Servers } from '../servers/serversList';
import { logger } from '../log';
import { RestParser, RestResponse, Verbs } from '../rest';
import { ClassContainer } from '../class-container';
import { ConfigHelper } from '../decorators/configuration';
const methodMetadataKey = 'methodus';
/** the @Method decorator registers the model with the odm
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */

export function MethodPipe(verb: Verbs, route: string, middlewares?: any[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {

        target.methodus = target.methodus || {};
        const name = target.name || target.constructor.name;
        target.methodus[name] = target.methodus[name] || { _events: {}, _descriptors: {} };

        const mTarget = target.methodus[name];

        let metaObject = Object.assign({}, { verb, route, propertyKey, middlewares, params: [] });
        if (mTarget._descriptors[propertyKey]) {
            metaObject = Object.assign(metaObject, { params: mTarget._descriptors[propertyKey].params });
        }

        Reflect.defineMetadata(methodMetadataKey, metaObject, target, propertyKey);
        mTarget._descriptors[propertyKey] = metaObject as MethodDescriptor;
        const paramsMap: any[] = metaObject.params;
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        });
        // save a reference to the original method
        const originalMethod = descriptor.value;

        // not async
        descriptor.value = function (...args: any[]) {
            validateServerIsRunning();
            // extract metadata for class and method
            let configName = target.name;
            if (!configName && target.constructor) {
                configName = target.constructor.name;
            }

            const config = Servers.classes[configName];

            // we will return a MethodResult or a MEthodError
            let methodResult: MethodResult | MethodError | any = null;

            // try to get the method metadata from the Relection API.
            let methodus: any = mTarget;
            if (!methodus) { // if the target dont contain the methodus metadaat, try to get it from the Reflection API
                methodus = Reflect.getOwnMetadata(methodMetadataKey, target, propertyKey) || {};
            }

            const existingClassMetadata: any = ClassContainer.get(methodus.name);

            // merge the configuration object
            Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);

            const functionArgs: any[] = [];

            let methodType = MethodType.Local; // we default to local
            // rest paramters should be parsed differntly
            const parser = new RestParser(methodus.serverType);
            const ParserResponse = parser.parse(args, paramsMap, functionArgs);

            // acquire the method information from the config classes map
            const completeConfiguration = Object.assign({}, methodus, config);
            if (methodus) {
                let configurationBlock = ConfigHelper.get(methodus.name);
                if (!configurationBlock) {
                    configurationBlock = ConfigHelper.get(methodus.name);
                }
                if (configurationBlock) {
                    Object.assign(completeConfiguration, {
                        methodType: configurationBlock.transport,
                        resolver: () => configurationBlock.resolver,
                    });
                }
            }
            if (completeConfiguration && completeConfiguration.methodType) {
                // if methodinformation exists we use the mehtod from it.
                methodType = completeConfiguration.methodType;
            }
            // run and store the result
            const restHeaders = null;
            try {
                let server: ServerType | null = null;

                const mappedArgs = paramsMap.map((param) => {
                    return { [param.name || param.from]: ParserResponse.args[param.index] };
                });

                logger.info(`Method::call`, methodType, originalMethod.name, ...mappedArgs);
                switch (methodType) {
                    case MethodType.Mock:
                        methodResult = new MethodResult(methodus._mocks[propertyKey]);
                        break;
                    case MethodType.Local:
                        methodResult = originalMethod.apply(this, ParserResponse.args);
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
                    methodResult = new MethodResult(Servers.send(server, ParserResponse.args,
                        completeConfiguration,
                        paramsMap,
                        ParserResponse.securityContext));
                }
            } catch (error) {
                error.statusCode = error.statusCode || 500;
                logger.error(this, error);

                if (ParserResponse.isRest) {
                    const router = new RestResponse(args, error, restHeaders);
                } else {
                    throw (error);
                }

            }

            if (ParserResponse.isRest) {
                if (methodResult.toString() === '[object Promise]') {
                    methodResult.then((resolvedPromise: any) => {
                        // methodResult = new MethodResult(StreamFromPromise(methodResult, { objectmode: true }));
                        const response = new RestResponse(args, resolvedPromise, restHeaders);
                    });

                } else {
                    const response = new RestResponse(args, methodResult, restHeaders);
                }

            } else {

                logger.info(`Method::OK`, '<==', methodType, originalMethod.name);
                return methodResult;

            }

        };
        return descriptor;
    };
}

function validateServerIsRunning() {
    if (!Servers) {
        throw (new Error(`methodus server is not running, did you miss a 'run' statement?`));
    }
}
