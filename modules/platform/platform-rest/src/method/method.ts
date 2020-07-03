import 'reflect-metadata';
import commons, { validate, TransportType, MethodResult, MethodError, MethodResultStatus } from '@methodus/framework-commons';

import injection from '@methodus/framework-injection';
import { Clients } from '../clients-list';

const getClassOf = Function.prototype.call.bind(Object.prototype.toString);
const methodMetadataKey = 'methodus';

/** the @Method decorator registers route listeners
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */
// export function Method(verb?: string, route?: string, middlewares?: Function[]) {
//     return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
//         return verbBasedMethod(target, propertyKey, descriptor, verb, route, middlewares);
//     };
// }

export function verbBasedMethod(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>, verb?: string, route?: string, middlewares?: Function[]) {
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
        target = this; //Injector.get(target.name);

        // extract metadata for class and method
        let configName = target.name;
        if (!configName && target.constructor && target.constructor.name !== 'Object') {
            configName = target.constructor.name;
        }

        // we will return a MethodResult or a MethodError
        let methodResult: MethodResult | MethodError | any = null;
        // try to get the method metadata from the Relection API.
        let methodus: any = mTarget;
        if (!methodus) {
            // if the target dont contain the methodus metadaat, try to get it from the Reflection API
            methodus = Reflect.getOwnMetadata(methodMetadataKey, target, propertyKey) || {};
        }

        let client = Clients.clients[configName];

        const existingClassMetadata: any = injection.ClassContainer.get(configName);
        if (client) {
            // merge the configuration object
            Object.assign(methodus, methodus._descriptors[propertyKey], existingClassMetadata);
            if (getClassOf(target) === '[object Object]') {
                // the target is an instance not a class
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
                    methodResult = await client.transportType.send.apply(target, [methodus, args, paramsMap]);
                }

                return handleResult(methodResult);
            } catch (ex) {
                if (Buffer.isBuffer(ex.error)) {
                    ex.error = ex.error.toString();
                    ex.message = ex.error; // the message property is what we display
                }
                try {
                    ex.message = JSON.parse(ex.message).error;
                } catch (err) {}
                throw ex;
            }
        } else {
            const result = await originalMethod.apply(target, args);
            return handleResult(result);
        }
    };

    descriptor.value = value;
    return descriptor;
}

export async function handleResult(methodResult: any) {
    if (methodResult !== null && methodResult !== undefined && methodResult.result !== null && methodResult.result !== undefined) {
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
            commons.logger.error(error);
            throw new MethodResultStatus(error, error.statusCode);
        }
    }
    return methodResult;
}
export function validateServerIsRunning() {
    if (!Clients) {
        throw new Error(`methodus server is not running, did you miss a 'run' statement?`);
    }
}
