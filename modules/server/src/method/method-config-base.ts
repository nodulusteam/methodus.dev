// tslint:disable-next-line:no-reference
/// <reference path="./method.ts" />
import 'reflect-metadata';
import { MethodType, ServerType } from '@methodus/framework-commons';
import { Servers } from '../servers/serversList';
import injection from '@methodus/framework-injection';

// tslint:disable-next-line:no-namespace
export namespace Methods {
    /** the MethodConfigBase decorator allows MethodConfig classes to inherit from.
     *  @param {string} name - the identifier of the controller.
     *  @param {Function[]} middlewares - an array of middlewares functions to apply to this controller}
     */
    export function MethodConfigBase(name: string, middlewares?: Function[], repository?: any) {
        return (target: any) => {

            const existingMetadata = injection.ClassContainer.get(name) || {};
            existingMetadata.name = name;
            const original = target.prototype.constructor;
            original.prototype.options = original.prototype.options ||
                { servers: [], classes: [], clients: [], plugins: [] };

            let proto = target.prototype || target.__proto__;

            if (target.methodus) { // means its a static class , no prototype
                proto = target;
            }

            proto.methodus[name].isBase = true;
            proto.methodus_base = JSON.parse(JSON.stringify(proto.methodus[name]));



            Servers.classes[target.name] = {
                classType: target,
                controller: target, methodType: MethodType.Local,
                serverType: ServerType.Express,
            };

            const methods = Object.getOwnPropertyNames(target.prototype);

            methods.forEach((methodName: string): void => {
                return target.prototype[methodName];
            });

            if (target.prototype.constructor) {
                const staticMethods = Object.getOwnPropertyNames(target.prototype.constructor);
                staticMethods.forEach((methodName: string): void => {
                    return target.prototype.constructor[methodName];
                });
            }


            proto.methodus_base.middlewares = middlewares;
            target.methodus_base = proto.methodus_base;
            existingMetadata.middlewares = middlewares;
            injection.ClassContainer.set(name, existingMetadata);
        };
    }
}