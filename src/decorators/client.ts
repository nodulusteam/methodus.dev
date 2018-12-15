import 'reflect-metadata';
import { MethodType, ServerType } from '../interfaces';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function ClientConfiguration(controller: any, methodType: MethodType, serverType: ServerType, resolver?: any) {
    return (target: any) => {
        const original = target.prototype.constructor;
        original.prototype.options = original.prototype.options || { servers: [], classes: [], plugins: [] };

        original.prototype.options.classes.push({ controller, methodType, serverType, resolver });

        // // the new constructor behaviour
        // const f: any = () => {
        //     const instance = new original(target.prototype.options);
        //     return instance;
        // };
        // // copy prototype so intanceof operator still works
        // f.prototype = original.prototype;
        // // return new constructor (will override original)
        // return f;
    };
}
