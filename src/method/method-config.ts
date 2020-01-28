// tslint:disable-next-line:no-reference
/// <reference path="./method.ts" />
import 'reflect-metadata';
import { ClassContainer } from '../class-container';
import { Injector, RegistrationTypes } from '../di';


// tslint:disable-next-line:no-namespace
export namespace Methods {
    /** the MethodConfig decorator registers the controller as a router
     *  @param {string} name - the identifier of the controller in the resolver.
     *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
     */
    export function MethodConfig(name: string, middlewares?: any[], prefix?: string) {
        return (target: any) => {

            //use the injectable logic here
            Injector.inject(RegistrationTypes.Controller, target, name);
            const instance = Injector.get(target);

            const existingMetadata = ClassContainer.get(name) || {};
            existingMetadata.name = name;
            let proto = target.prototype || target.__proto__;

            if (target.methodus) { // means its a static class , no prototype
                proto = target;
            }
            proto.methodus[name] = proto.methodus[name] || { _auth: {}, _events: {}, _descriptors: {} };
            proto.methodus[name].name = name;

            if (prefix) {
                proto.methodus[name].prefix = prefix;
            }

            if (Object.keys(proto.methodus).length > 1) {

                let baseClass: any = Object.values(proto.methodus).filter((item: any) => { return item.isBase });
                const baseClone = baseClass[0] ?  JSON.parse(JSON.stringify(baseClass[0]._descriptors)) : {};
                const targetClone = JSON.parse(JSON.stringify(proto.methodus[name]._descriptors));

                const new_assign = Object.assign({}, baseClone, targetClone);
                proto.methodus[name]._descriptors = new_assign;
                if (prefix) {
                    Object.values(proto.methodus[name]._descriptors).forEach((item: any) => {
                        item.route = prefix + item.route;
                    });
                }


            }


            proto.methodus[name].middlewares = middlewares;
            existingMetadata.middlewares = middlewares;
            ClassContainer.set(name, existingMetadata);

            Object.values(proto.methodus[name]._descriptors).forEach((descriptor: any) => {
                return instance[descriptor.propertyKey];
            });

        };
    }
}
