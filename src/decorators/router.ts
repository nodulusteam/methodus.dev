import 'reflect-metadata';
import { MethodType, ServerType } from '../interfaces';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function RouterConfiguration(controller: any, serverType: ServerType) {
  return (target: any) => {
    const original = target.prototype.constructor;
    original.prototype.options = original.prototype.options ||
      { servers: [], classes: [], clients: [], plugins: [] };
    original.prototype.options.classes.push({
      classType: controller,
      controller,
      methodType: MethodType.Local,
      serverType,
    });
  };
}
