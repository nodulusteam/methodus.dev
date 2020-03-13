
import 'reflect-metadata';
import { ServerType, ServerDefinition, Dictionary, ClassRef } from '../interfaces';

export namespace Decorators {

    /** the ServerConfiguration decorator registers a server
     *  @param {string} serverType - the type for the server.
     *  @param {object} options - any options that needs to be passed to the server object
     */
    export function ServerConfiguration(serverType: ServerType | string | ServerDefinition | any, options?: Dictionary) {
        return (target: ClassRef) => {
            const original = target.prototype.constructor;
            original.prototype.options = original.prototype.options ||
                { servers: [], classes: [], clients: [], plugins: [] };
            original.prototype.options.servers.push({ serverType, options });
        };
    }
}
