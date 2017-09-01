

const excludedProps = ['constructor'];


import "reflect-metadata";
import { MethodulusConfigurations, MethodulusConfig, MethodDescriptor, MethodType, ServerType } from '../config';
import { MethodResult, MethodError } from '../response';
import { fp } from '../fp';
import { logger, Log, LogClass } from '../log/';
import { RestParser, RestResponse, Verbs } from '../rest';
import { Servers } from '../servers/serversList';
let metadataKey = 'methodulus';


function mergeMetadata(methodulus) {
    // if (global.methodulus && global.methodulus.server) {
    let config = MethodulusConfigurations.get();// global.methodulus.server.config;
    let methodinformation = config.classes.get(methodulus.name);
    return Object.assign({}, methodulus, methodinformation);
    //  } else {
    //  return methodulus;
    //  }

}

export function Method(verb: Verbs, route: string, methodType?: MethodType) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target.methodulus = target.methodulus || { _events: {}, _descriptors: {} }
        let metaObject = { verb, route, methodType, propertyKey }
        Reflect.defineMetadata(metadataKey, metaObject, target, propertyKey);
        target.methodulus._descriptors[propertyKey] = metaObject as MethodDescriptor


        let paramsMap: any[] = Reflect.getOwnMetadata('params', target, propertyKey) || [];
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        })
        //console.debug('method params', propertyKey, paramsMap);

        // save a reference to the original method
        let originalMethod = descriptor.value;
        //methodType = methodType || MethodType.Local;
        descriptor.value = async function (...args: any[]) {


            //extract metadata for class and method
            let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
            //console.debug('existingClassMetadata', existingClassMetadata);

            let methodResult: MethodResult | MethodError | any = null;
            let proto = fp.proto(this);


            let methodulus: any = Reflect.getOwnMetadata(metadataKey, proto, propertyKey) || {};
            //console.debug('methodulus reflected', methodulus);
            Object.assign(methodulus, existingClassMetadata);

            //let methodulus = proto.methodulus;
            //methodulus.route = route;
            let functionArgs: any[] = args;
            let ParserResponse = RestParser(args, paramsMap, functionArgs);

            let completeConfiguration = mergeMetadata(methodulus);
            if (completeConfiguration)
                methodType = completeConfiguration.methodType || MethodType.Local;

            completeConfiguration.propertyKey = propertyKey;
            // run and store the result
            try {
                let server: ServerType | null = null;
                switch (methodType) {
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

                if (server)
                    methodResult = await send(server, ParserResponse.args, completeConfiguration, paramsMap);


            } catch (error) {
                methodResult = error;
                //methodResult.error = error.message;
                // methodResult.error = error;
                methodResult.statusCode = methodResult.statusCode || 500;
                //log the error
                logger.error(error);
            }



            if (ParserResponse.isRest) {
                RestResponse(args, methodResult);
                return;
            }
            else {
                if (methodResult.error && methodResult.statusCode) {
                    throw (methodResult);
                }

                return methodResult;

            }

        };

        return descriptor;
    }
}



async function send(server: ServerType, functionArgs: any, methodulus: any, paramsMap: any[]) {
    let result = await Servers.send(server, functionArgs, methodulus, paramsMap);
    return result;
}

