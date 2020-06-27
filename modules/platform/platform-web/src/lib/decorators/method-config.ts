import { Injector } from '../di';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfig(name: string, middlewares?: any[], baseRoute?: string) {
    return (target: any) => {

        //use the injectable logic here
        Injector.inject(target, name);

        let proto = target.prototype || target.__proto__;

        if (target.methodus) { // means its a static class , no prototype
            proto = target;
        }
        proto._symbol = name;
        proto.methodus[name] = proto.methodus[name] || { _auth: {}, _events: {}, _descriptors: {} };
        proto.methodus[name].name = name;

        if (proto.methodus && Object.keys(proto.methodus).length > 1) {
            //this is not the first so it has a base, find it
            const parentClass = Object.keys(proto.methodus).filter(part => proto.methodus[part].isBase);
            if (parentClass.length > 0) {
                let inheritSettings: any = {};
                const filterKeys = ['length', 'caller', 'prototype', 'name', 'methodus', 'methodus_base', 'arguments'];
                let descriptorsCollection;
                if (proto.methodus[parentClass[0]]) {
                    descriptorsCollection = proto.methodus[parentClass[0]]._descriptors;
                    if (!descriptorsCollection || (descriptorsCollection && Object.keys(descriptorsCollection).length === 0)) {
                        Object.keys(proto.methodus).forEach((key) => {
                            if (Object.keys(proto.methodus[key]._descriptors).length > 0) {
                                descriptorsCollection = proto.methodus[key]._descriptors;
                            }
                        });
                    }
                }

                Object.getOwnPropertyNames(descriptorsCollection).forEach((key) => {
                    if (filterKeys.indexOf(key) === -1) {
                        const extendTarget = Injector.get(parentClass[0]);
                        const func = async function (...args: any[]) {
                            args.push({ methodus: proto.methodus[name] });
                            return await extendTarget[key].apply(target, args);
                        };
                        inheritSettings[key] = func;//.bind(target);
                    }
                });
                const childTarget = Injector.get(name);
                Object.assign(childTarget, inheritSettings);
            }
        }

        if (baseRoute) {
            proto.methodus[name].baseRoute = baseRoute;
        }

        const methods = Object.getOwnPropertyNames(target.prototype);
        methods.forEach((methodName: string): void => {
            return target.prototype[methodName];
        });
    };
}
