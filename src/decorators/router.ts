import 'reflect-metadata';
import { MethodType, ServerType } from '../interfaces';

export interface ServerDefinition {
  name: string;
  path?: string;
  static?: any;
  module?: any;
  parser?: any;
  response?: any;
}

/** the RouterConfiguration decorator registers the controller as a router
 *  @param {type} controller - a controller class using the @MethodConfig decorator.
 *  @param {string} serverType - the name of the server
 */
export function RouterConfiguration(controller: any, serverType: ServerType | string | ServerDefinition | any) {
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
