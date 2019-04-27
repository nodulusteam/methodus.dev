import 'reflect-metadata';
import { ClassContainer } from '../class-container';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfigBase(name: string, middlewares?: any[], repository?: any) {
    return (target: any) => {
        const existingMetadata = ClassContainer.get(name) || {};
        existingMetadata.name = name;
        let proto = target.prototype || target.__proto__;

        if (target.methodus) { // means its a static class , no prototype
            proto = target;
        }

        // if (proto.methodus.name && proto.methodus.name !== name) {
        //     // prefix routes
        //     const routePrefix = name.toLocaleLowerCase();
        //     Object.keys(proto.methodus._descriptors).forEach((desciptorKey) => {
        //         const route = proto.methodus._descriptors[desciptorKey].route;
        //         proto.methodus._descriptors[desciptorKey].route = '/' + routePrefix + route;
        //     });
        //     // proto.methodus = { name, _events: {}, _descriptors: {}, base: target.prototype.methodus };
        // }
        proto.methodus_base = JSON.parse(JSON.stringify(target.methodus[name]));

        const methods = Object.getOwnPropertyNames(target.prototype);

        methods.forEach((methodName: string): void => {
            return target.prototype[methodName];
        });

        if (target.prototype.constructor) {
            const staticMethods = Object.getOwnPropertyNames(target.prototype.constructor);

            staticMethods.forEach((methodName: string): void => {
                // console.log(target.prototype[methodName]);
                const stud = target.prototype.constructor[methodName];
                console.log(stud, target.prototype.constructor[methodName]);
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
