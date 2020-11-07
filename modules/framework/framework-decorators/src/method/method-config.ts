import 'reflect-metadata';
import injection from '@methodus/framework-injection';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfig(
    name: string,
    middlewares?: any[],
    prefix?: string
) {
    return (target: any) => {
        //use the injectable logic here
        injection.Injector.registerSingleton(
            name,
            // injection.RegistrationTypes.Controller,
            target,

        );
        const instance = injection.Injector.resolve<typeof target>(name);

        const existingMetadata = injection.Injector.resolve<typeof target>(name) || {};
        existingMetadata.name = name;
        let proto = target.prototype || target.__proto__;

        if (target.methodus) {
            // means its a static class , no prototype
            proto = target;
        }

        if (!proto.methodus) {
            return;
        }
        proto.methodus[name] = proto.methodus[name] || {
            _auth: {},
            _events: {},
            _descriptors: {},
        };
        proto.methodus[name].name = name;

        if (prefix) {
            proto.methodus[name].prefix = prefix;
        }

        if (Object.keys(proto.methodus).length > 1) {
            let baseClass: any = Object.values(proto.methodus).filter(
                (item: any) => {
                    return item.isBase;
                }
            );
            const baseClone = baseClass[0]
                ? JSON.parse(JSON.stringify(baseClass[0]._descriptors))
                : {};
            const targetClone = JSON.parse(
                JSON.stringify(proto.methodus[name]._descriptors)
            );

            const new_assign = Object.assign({}, baseClone, targetClone);
            proto.methodus[name]._descriptors = new_assign;
        }

        proto.methodus[name].middlewares = middlewares;
        existingMetadata.middlewares = middlewares;
        injection.ClassContainer.set(name, existingMetadata);

        Object.values(proto.methodus[name]._descriptors).forEach(
            (descriptor: any) => {
                return instance[descriptor.propertyKey];
            }
        );
    };
}
