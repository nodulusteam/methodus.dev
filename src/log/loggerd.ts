import { logger } from './logger'

let methodIdentifier: number = 100000;
export function Log() {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {


        // save a reference to the original method
        let originalMethod = descriptor.value;
        methodIdentifier++;
        //methodType = methodType || MethodType.Local;
        descriptor.value =
            function (_methodIdentifier) {
                return function (...args: any[]) {
                    let name = target.name;
                    if (!name && target.constructor)
                        name = target.constructor.name;
                    else {
                        name = 'no name';
                    }
                    logger.log(`${_methodIdentifier}::${name}.${propertyKey} => `, args);
                    let result = originalMethod.call(this, ...args);
                    if (result)
                        logger.log(`${_methodIdentifier}:: ${name}.${propertyKey} <= `, result);
                    return result;
                };
            }(methodIdentifier)

        return descriptor;
    }
}


export function LogParam(name?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        // let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        // if (name)
        //     existingMetadata.push({ from: 'body', index: parameterIndex, name: name });
        // else
        //     existingMetadata.push({ from: 'body', index: parameterIndex });

        // Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}


export function LogClass() {
    return (target: any) => {
        // save a reference to the original constructor
        var original = target;
        methodIdentifier++;
        // the new constructor behaviour
        var f: any = function (_methodIdentifier) {
            return function (...args) {
                logger.log(`${_methodIdentifier}::new ${original.name}()`, args);
                return new original(...args);
            }
        }(methodIdentifier);

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    }
}