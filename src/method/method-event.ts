

const excludedProps = ['constructor'];
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodulusConfig, EventDescriptor, MethodType, ServerType } from '../config';
import { MethodResult, MethodError } from '../response';
import { fp } from '../fp';
import { RestParser, RestResponse, Verbs } from '../rest';
let metadataKey = 'methodulus';


function mergeMetadata(methodulus) {
    let config = global.methodulus.server.config;
    debug('MethodulusConfig', config[methodulus.name]);
    let methodinformation = config.classes.get(methodulus.name);
    return Object.assign({}, methodulus, methodinformation);
}


export function EventName() {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        existingMetadata.push({ from: 'response', index: parameterIndex });
        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}

export function Event(name: string, verb: Verbs, route: string, methodType?: MethodType) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target.methodulus = target.methodulus || { _events: {}, _descriptors: {} }
        let metaObject: EventDescriptor = { name, verb, route, methodType, propertyKey }
        Reflect.defineMetadata(metadataKey, metaObject, target, propertyKey);
        target.methodulus._events[name] = metaObject as EventDescriptor;
  
  

        let paramsMap: any[] = Reflect.getOwnMetadata('params', target, propertyKey) || [];
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        })
        debug('method params', propertyKey, paramsMap);
        // save a reference to the original method
        let originalMethod = descriptor.value;
        //methodType = methodType || MethodType.Local;
        var eventHandler = async (...args: any[]) => {

            let proto = fp.proto(target);
            //extract metadata for class and method
            let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
            debug('existingClassMetadata', existingClassMetadata);

            let methodResult: MethodResult | MethodError | any = null;
            let methodulus: any = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};
            debug('methodulus reflected', methodulus);
            Object.assign(methodulus, existingClassMetadata);

            //let methodulus = proto.methodulus;
            //methodulus.route = route;
            let functionArgs: any[] = args;
            let ParserResponse = RestParser(args, paramsMap, functionArgs);
            let methodType;
            let completeConfiguration = mergeMetadata(methodulus);
            if (completeConfiguration)
                methodType = completeConfiguration.methodType || MethodType.Local;



            // run and store the result
            try {
                let server: ServerType | null = null;
                switch (methodType) {
                    case MethodType.Local:
                        await originalMethod(...ParserResponse.args);
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
                    await send(server, ParserResponse.args, completeConfiguration, paramsMap);


            } catch (error) {

            }

        };



        descriptor.value = eventHandler
        return descriptor;
    }
}



async function send(server: ServerType, functionArgs: any, methodulus: any, paramsMap: any[]) {
    let result = await global.methodulus.server._send(server, functionArgs, methodulus, paramsMap);
    return result;
}

