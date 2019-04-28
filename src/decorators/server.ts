
import 'reflect-metadata';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function ServerConfiguration(serverType: any, options: any) {
    return (target: any) => {
        const original = target.prototype.constructor;
        original.prototype.options = original.prototype.options ||
         { servers: [], classes: [], clients: [], plugins: [] };
        original.prototype.options.servers.push({ serverType, options });
        // // the new constructor behaviour
        // const f: any = (configOptions: { servers: any[], classes: any[], plugins: string[] }) => {
        //     const instance = new original(original.prototype.options);
        //     return instance;
        // };

        // // copy prototype so intanceof operator still works
        // f.prototype = original.prototype;
        // // return new constructor (will override original)
        // return f;
    };
}
