import 'reflect-metadata';

/** the ModuleConfiguration decorator registers a module to the main server instance
 *  @param {Class} Class - A module class, using the @Module decorator
 */
export function ModuleConfiguration(moduleClass: any) {
  return (target: any) => {
    const moduleClassInfo = moduleClass.prototype!.constructor ;
    if (!moduleClassInfo.prototype.options) {
      throw new Error('Empty module.');
    }

    const original = target.prototype.constructor;
    original.prototype.options = original.prototype.options ||
      { servers: [], classes: [], clients: [], plugins: [] };
    const setupObject = original.prototype.options;
    const moduleObject = moduleClassInfo.prototype.options;
    setupObject.classes = setupObject.classes.concat(moduleObject.classes);
    setupObject.servers = setupObject.servers.concat(moduleObject.servers);
    setupObject.clients = setupObject.clients.concat(moduleObject.clients);
    setupObject.plugins = setupObject.plugins.concat(moduleObject.plugins);

  };
}
