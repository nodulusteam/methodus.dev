import "reflect-metadata";
let metadataKey = 'params';
const debug = require('debug')('methodulus');
export function Body(name?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        if (name)
            existingMetadata.push({ from: 'body', index: parameterIndex, name: name });
        else
            existingMetadata.push({ from: 'body', index: parameterIndex });

        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}

export function Param(name?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];

        if (name)
            existingMetadata.push({ from: 'params', index: parameterIndex, name: name });
        else
            existingMetadata.push({ from: 'params', index: parameterIndex });

        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}

export function Query(name?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];

        if (name)
            existingMetadata.push({ from: 'query', index: parameterIndex, name: name });
        else
            existingMetadata.push({ from: 'query', index: parameterIndex });

        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}


export function Headers(name?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];

        if (name)
            existingMetadata.push({ from: 'headers', index: parameterIndex, name: name });
        else
            existingMetadata.push({ from: 'headers', index: parameterIndex });

        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}

export function Cookies(name?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];

        if (name)
            existingMetadata.push({ from: 'cookies', index: parameterIndex, name: name });
        else
            existingMetadata.push({ from: 'cookies', index: parameterIndex });

        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}






export function Response() {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        existingMetadata.push({ from: 'response', index: parameterIndex });
        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}

export function Request() {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        existingMetadata.push({ from: 'request', index: parameterIndex });
        Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}