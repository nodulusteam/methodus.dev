
import 'reflect-metadata';

export namespace Decorators {

    /** the ServerConfiguration decorator registers a server
     *  @param {string} serverType - the type for the server.
     *  @param {object} options - any options that needs to be passed to the server object
     */
    export function ServerConfiguration(serverType: any, options?: any) {
        return (target: any) => {
            const original = target.prototype.constructor;
            original.prototype.options = original.prototype.options ||
                { servers: [], classes: [], clients: [], plugins: [] };
            original.prototype.options.servers.push({ serverType, options });
        };
    }
}
