import 'reflect-metadata';

export namespace Decorators {
    /** the MethodConfig decorator registers the controller as a router
     *  @param {string} name - the identifier of the controller in the resolver.
     *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
     */
    export function ClientConfiguration(controller: any, transportType: any, resolver?: any) {
        return (target: any) => {
            const original = target.prototype.constructor;
            original.prototype.options = original.prototype.options ||
                { servers: [], classes: [], clients: [], plugins: [] };
            original.prototype.options.clients.push({
                classType: controller,
                controller,
                transportType,
                resolver,
            });
        };
    }
}
