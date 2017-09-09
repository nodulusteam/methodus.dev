

import 'reflect-metadata';
import { logger } from '../log';
import { MethodType, MethodulusClassConfig } from '../config';

let metadataKey = 'methodus';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function Client(controller: any, methodType: MethodType, resolver?: any) {
  return function (target: any) {

    var original = target.prototype.constructor;

    // the new constructor behaviour
    var f: any = function (options: { servers: any[], classes: any[] }) {

      options.classes.push({ controller: controller, methodType: methodType, resolver: resolver });
      let instance = new original(options);
      // Object.keys(this.__proto__).forEach(element => {
      //   instance[element] = this.__proto__[element];

      // })
      return instance;

     
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;

  }
}
