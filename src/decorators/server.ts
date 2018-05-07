
import 'reflect-metadata';
import { logger } from '../log/';
let metadataKey = 'methodus';

import { MethodType, ServerType } from '../interfaces';
/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function ServerConfiguration(serverType: ServerType, options: any) {
    return function (target: any) {
        var original = target;
        original.prototype.options = original.prototype.options || { servers: [], classes: [] };
        original.prototype.options.servers.push({ serverType: serverType, options: options })
        // the new constructor behaviour
        var f: any = function (configOptions: { servers: any[], classes: any[] }) {
            // if (!configOptions || Object.keys(configOptions).length === 0)
            //     configOptions = { servers: [], classes: [] };


            let instance = new original(original.prototype.options);
            return instance;
        }

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    }
}
