import 'reflect-metadata';
import { ClassContainer } from '../class-container';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfig(name: string, middlewares?: any[], repository?: any) {
    return (target: any) => {
        const existingMetadata = ClassContainer.get(name) || {};
        existingMetadata.name = name;
        let proto = target.prototype || target.__proto__;

        if (target.methodus) { // means its a static class , no prototype
            proto = target;
        }

        if (proto.methodus.name && proto.methodus.name !== name) {
            // prefix routes
            const routePrefix = name.toLocaleLowerCase();
            Object.keys(proto.methodus._descriptors).forEach((desciptorKey) => {
                const route = proto.methodus._descriptors[desciptorKey].route;
                proto.methodus._descriptors[desciptorKey].route = '/' + routePrefix + route;
            });
            // proto.methodus = { name, _events: {}, _descriptors: {}, base: target.prototype.methodus };
        }
        proto.methodus.name = name;

        if (repository) {
            proto.methodus.repository = repository;
        }
        proto.methodus.middlewares = middlewares;
        existingMetadata.middlewares = middlewares;
        ClassContainer.set(name, existingMetadata);

    };
}
