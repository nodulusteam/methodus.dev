

const excludedProps = ['constructor'];
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodulusConfig, MethodDescriptor, MethodType, ServerType } from './config';
import { MethodResult, MethodError } from './response';
import { fp } from './fp';
import { RestParser, RestResponse, Verbs } from './rest';



let metadataKey = 'methodulus';
export function MethodConfig(name: string, endpoint?: string) {
    debug('MethodConfig', name, endpoint);
    return function (target: any) {
        let existingMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
        existingMetadata.endpoint = endpoint
        existingMetadata.name = name
        let proto = fp.proto(target);
        proto.methodulus.name = name;
        proto.methodulus.endpoint = endpoint;

        Reflect.defineMetadata(metadataKey, existingMetadata, proto);
        debug('MethodConfig function', existingMetadata);
    }
}



function mergeMetadata(methodulus) {
    let config = global.methodulus.server.config;
    debug('MethodulusConfig', config[methodulus.name]);
    let methodinformation = config.classes.get(methodulus.name);
    return Object.assign({}, methodulus, methodinformation);
}

export function Method(verb: Verbs, route: string, methodType?: MethodType) {
    debug('decorating', verb, route);
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        //  let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};
        // existingMetadata[propertyKey] = { verb, route, methodType } as MethodDescriptor;
        //  debug('define metadata', route);
        target.methodulus = target.methodulus || { _descriptors: {} }
        let metaObject = { verb, route, methodType, propertyKey }
        Reflect.defineMetadata(metadataKey, metaObject, target, propertyKey);
        target.methodulus._descriptors[propertyKey] = metaObject as MethodDescriptor


        let paramsMap: any[] = Reflect.getOwnMetadata('params', target, propertyKey) || [];
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        })
        debug('method params', propertyKey, paramsMap);

        // save a reference to the original method
        let originalMethod = descriptor.value;
        //methodType = methodType || MethodType.Local;
        descriptor.value = async function (...args: any[]) {


            //extract metadata for class and method
            let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
            debug('existingClassMetadata', existingClassMetadata);

            let methodResult: MethodResult | MethodError | any = null;
            let proto = fp.proto(this);


            let methodulus: any = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};
            debug('methodulus reflected', methodulus);
            Object.assign(methodulus, existingClassMetadata);

            //let methodulus = proto.methodulus;
            //methodulus.route = route;
            let functionArgs: any[] = args;
            let ParserResponse = RestParser(args, paramsMap, functionArgs);

            let completeConfiguration = mergeMetadata(methodulus);
            if (completeConfiguration)
                methodType = completeConfiguration.methodType || MethodType.Local;



            // run and store the result
            try {
                let server: ServerType | null = null;
                switch (methodType) {
                    case MethodType.Local:
                        methodResult = await originalMethod(...ParserResponse.args);
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
                }

                if (server)
                    methodResult = await send(server, ParserResponse.args, completeConfiguration, paramsMap);


            } catch (error) {
                methodResult = error;
            }



            if (ParserResponse.isRest) {
                RestResponse(args,  methodResult);
                return;
            }
            else {
                if (methodResult.error && methodResult.statusCode) {
                    throw (methodResult);
                }
                if(methodType === MethodType.Local)
                    {
// return the result of the original method
                return methodResult.result;
                    }else
            return methodResult;
                
            }

        };

        return descriptor;
    }
}



async function send(server: ServerType, functionArgs: any, methodulus: any, paramsMap: any[]) {
    let result = await global.methodulus.server._send(server, functionArgs, methodulus, paramsMap);
    return result;
}

