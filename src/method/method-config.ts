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
        
        // if (target.__proto__ && target.__proto__.methodus_base) { // means its a static class , no prototype
        //     // prefix routes
        //     //  proto.methodus[name] = 
        //     

        //     const mbase = target.__proto__.methodus_base;
        //     const routePrefix = name.toLocaleLowerCase();
        //     Object.keys(mbase._descriptors).forEach((desciptorKey) => {
        //         const route = mbase._descriptors[desciptorKey].route;
        //         target.methodus[name]._descriptors[desciptorKey] =
        //             JSON.parse(JSON.stringify(mbase._descriptors[desciptorKey]));

        //         target.methodus[name]._descriptors[desciptorKey].route = '/' + routePrefix + route;
        //     });
        // }
        // // const name = target.name || target.constructor.name;
        // // target.methodus[name] = target.methodus[name] || { _events: {}, _descriptors: {} };
        // // const mTarget = target.methodus[name];

        // // if (proto.methodus.name && proto.methodus.name !== name) {

        // //     // proto.methodus = { name, _events: {}, _descriptors: {}, base: target.prototype.methodus };
        // // }

        proto.methodus[name].name = name;

        if (repository) {
            proto.methodus[name].repository = repository;
        }
        proto.methodus[name].middlewares = middlewares;
        existingMetadata.middlewares = middlewares;
        ClassContainer.set(name, existingMetadata);

    };
}
