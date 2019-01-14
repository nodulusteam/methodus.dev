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
        proto.methodus[name] = proto.methodus[name] || { _events: {}, _descriptors: {} };
        proto.methodus[name].name = name;

        if (repository) {
            proto.methodus[name].repository = repository;
        }
        proto.methodus[name].middlewares = middlewares;
        existingMetadata.middlewares = middlewares;
        ClassContainer.set(name, existingMetadata);
    };
}
