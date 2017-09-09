

import 'reflect-metadata';
import { logger } from '../log/';
let metadataKey = 'methodus';
import { ServerType } from '../config';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function Server(serverType: ServerType, options: any) {
  return function (target: any) {
    var original = target;
    // the new constructor behaviour
    var f: any = function (configoptions: { servers: any[], classes: any[] }) {
      if (!configoptions || Object.keys(configoptions).length === 0)
        configoptions = { servers: [], classes: [] };
      configoptions.servers.push({ serverType: serverType, options: options })
      let instance = new original(configoptions);
      return instance;
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // return new constructor (will override original)
    return f;
  }
}



