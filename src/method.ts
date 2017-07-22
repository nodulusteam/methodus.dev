

const excludedProps = ['constructor'];
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodulusConfig } from './config';
import { MethodResult, MethodError } from './response';

export enum MethodType {
    Local = 'Local',
    Http = 'Http',
    MQ = 'MQ',
    Redis = 'Redis',
    Socket = 'Socket',
}

let metadataKey = 'methodulus';
export function MethodConfig(name: string, endpoint?: string) {
    debug('MethodConfig', name, endpoint);
    return function (target: any) {
        let existingMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
        existingMetadata.endpoint = endpoint
        existingMetadata.name = name
        let proto = target.prototype || target.__proto__;
        proto.methodulus.name = name;
        proto.methodulus.endpoint = endpoint;

        Reflect.defineMetadata(metadataKey, existingMetadata, target.prototype);
        debug('MethodConfig function', existingMetadata);
    }
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
            let config = global.methodulus.server.config;

            let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
            debug('existingClassMetadata', existingClassMetadata);

            let methodResult: MethodResult | MethodError | any = null;
            let proto = (this as any).prototype;
            if (!proto)
                proto = (this as any).__proto__;

            let methodulus: any = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};
            debug('methodulus reflected', methodulus);
            Object.assign(methodulus, existingClassMetadata);

            //let methodulus = proto.methodulus;
            //methodulus.route = route;
            let functionArgs: any[] = [];
            let sendFlag = false;
            if (args.length > 2 && args[2].name === 'next')//this call came from an express route
            {
                sendFlag = true;
                paramsMap.forEach((item: any) => {
                    item.value = args[0][item.from][item.name] || args[0][item.from];
                    functionArgs.push(item.value);
                });

            } else {
                functionArgs = args;
            }

            debug('MethodulusConfig', config[existingClassMetadata.name]);
            let methodinformation = config.classes.get(existingClassMetadata.name);
            if (methodinformation)
                methodType = methodinformation.methodType || MethodType.Local;

            let completeConfiguration = Object.assign({}, methodulus, methodinformation);
            // run and store the result
            try {
                switch (methodType) {
                    case MethodType.Local:
                        methodResult = await originalMethod(...functionArgs);
                        break;
                    case MethodType.Http:
                        methodResult = await http(functionArgs, completeConfiguration, paramsMap);
                        break;
                    case MethodType.Socket:
                        methodResult = await socketIO(functionArgs, completeConfiguration, paramsMap);
                        break;
                    case MethodType.MQ:

                        methodResult = await mq(functionArgs, completeConfiguration, paramsMap);
                        break;
                    case MethodType.Redis:
                        methodResult = await redis(functionArgs, completeConfiguration, paramsMap);
                        break;
                }
            } catch (error) {
                methodResult = error;
            }



            if (sendFlag) {
                let res = args[1];
                if (methodResult && methodResult.statusCode)
                    res.status(methodResult.statusCode);
                // else
                //     res.status(200);
                if (methodResult.total)
                    res.set("X-Total-Count", methodResult.total);


                res.send(methodResult.result || methodResult.error);
                return;
            }
            else {
                if (methodResult.error && methodResult.statusCode) {
                    throw (methodResult);
                }
                // return the result of the original method
                return methodResult.result;
            }

        };

        return descriptor;
    }
}

async function socketIO(functionArgs, methodulus, paramsMap) {

    var dataObject = {};
    functionArgs.forEach((element, index) => {
        dataObject[paramsMap.filter((item) => {
            return item.index === index;
        })[0].name] = element;
    });
    let result = await global.methodulus.server._send('socketio', dataObject, methodulus);
    return result;
    // try {

    // } catch (error) {
    //     return error;
    // }

    // if (result.error && result.statusCode) {
    //     throw (result);
    // }
    // return result.result;

}




async function http(functionArgs: any, methodulus: any, paramsMap: any[]) {
    let result = await global.methodulus.server._send('express', functionArgs, methodulus, paramsMap);
    return result;
}

async function mq(functionArgs, methodulus, paramsMap) {
    let result = await global.methodulus.server._send('amqp', functionArgs, methodulus, paramsMap);
    return result;
}

async function redis(functionArgs, methodulus, paramsMap) {
    let result = await global.methodulus.server._send('redis', functionArgs, methodulus, paramsMap);
    return result;
}



export class Verbs {
    public static Get: string = 'GET';
    public static Post: string = 'POST';
    public static Put: string = 'PUT';
    public static Patch: string = 'PATCH';
    public static Head: string = 'HEAD';
    public static Delete: string = 'DELETE';

}

// export class MethodType {
//     public static Local: string = 'Local';
//     public static Http: string = 'Http';
//     public static MQ: string = 'MQ';
//     public static Socket: string = 'Socket';
// }

export interface MethodDescriptor {
    verb: Verbs;
    route: string;
    methodType: MethodType;
    propertyKey: string;
}