// tslint:disable-next-line:no-reference
/// <reference path="./method.ts" />
import 'reflect-metadata';
import { ClassContainer } from '../class-container';
import { MethodType, ServerType } from '../interfaces';
import { Servers } from '../servers/serversList';

// tslint:disable-next-line:no-namespace
export namespace Methods {
    /** the MethodConfig decorator registers the controller as a router
     *  @param {string} name - the identifier of the controller in the resolver.
     *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
     */
    export function MethodConfigBase(name: string, middlewares?: any[], repository?: any) {
        return (target: any) => {
            const existingMetadata = ClassContainer.get(name) || {};
            existingMetadata.name = name;
            const original = target.prototype.constructor;
            original.prototype.options = original.prototype.options ||
                { servers: [], classes: [], clients: [], plugins: [] };

            let proto = target.prototype || target.__proto__;

            if (target.methodus) { // means its a static class , no prototype
                proto = target;
            }

            proto.methodus_base = JSON.parse(JSON.stringify(target.methodus[name]));

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

            if (repository) {
                proto.methodus_base.repository = repository;
            }
            proto.methodus_base.middlewares = middlewares;
            target.methodus_base = proto.methodus_base;
            existingMetadata.middlewares = middlewares;
            ClassContainer.set(name, existingMetadata);
        };
    }
}