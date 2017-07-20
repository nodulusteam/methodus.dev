

const excludedProps = ['constructor'];
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodulusConfig } from './config';

let metadataKey = 'methodulus';
export function MethodConfig(name: string, endpoint?: string) {
    debug('MethodConfig', name, endpoint);
    return function (target: any) {
        let existingMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
        existingMetadata.endpoint = endpoint
        existingMetadata.name = name
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
        target.methodulus = target.methodulus || {_descriptors: {}}
        let metaObject = { verb, route, methodType }
        Reflect.defineMetadata(metadataKey, metaObject, target, propertyKey);
        target.methodulus._descriptors[propertyKey] = metaObject as MethodDescriptor


        let paramsMap: any[] = Reflect.getOwnMetadata('params', target, propertyKey) || [];
        debug('method params', propertyKey, paramsMap);

        // save a reference to the original method
        let originalMethod = descriptor.value;
        //methodType = methodType || MethodType.Local;




        descriptor.value = async function (...args: any[]) {


            let existingClassMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
            debug('existingClassMetadata', existingClassMetadata);



            let result = null;
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
                })

            } else {
                functionArgs = args;
            }

            debug('MethodulusConfig', MethodulusConfig.config[existingClassMetadata.name]);
            methodType = MethodulusConfig.config[existingClassMetadata.name] || MethodType.Local;

            // run and store the result
            switch (methodType) {
                case MethodType.Local:
                    result = await  originalMethod(...functionArgs);
                    break;
                case MethodType.Http:
                    result = await http(functionArgs, methodulus, paramsMap);
                    break;
                case MethodType.Socket:
                    result = await socketIO(functionArgs, methodulus, paramsMap);
                    break;
                case MethodType.Q:
                    result = await q(...args);
                    break;
            }


            if (sendFlag) {
                let res = args[1];
                res.send(result);
            }
            else {
                // return the result of the original method
                return result;
            }

        };

        return descriptor;
    }
}

async function socketIO(functionArgs, methodulus, paramsMap) {

    var dataObject = {};
    functionArgs.forEach((element, index) => {
        dataObject[paramsMap.filter((item)=>{
            return item.index === index;
        })[0].name] = element;
    });

    let result = await global.methodulus.server._send('socketio', dataObject, methodulus);
    return result;

}




async function http(functionArgs: any, methodulus: any, paramsMap: any[]) {   
    let result = await global.methodulus.server._send('rest', functionArgs, methodulus, paramsMap);
    return result;
}

async function q(...args: any[]) {
    debug('q', ...args);
    let result = null;
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

export class MethodType {
    public static Local: string = 'Local';
    public static Http: string = 'Http';
    public static Q: string = 'Q';
    public static Socket: string = 'Socket';
}

export interface MethodDescriptor {
    verb: Verbs;
    route: string;
    methodType: MethodType;
}