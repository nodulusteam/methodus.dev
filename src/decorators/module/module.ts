
import 'reflect-metadata';

/** the Module decorator registers a module
 */
export function Module() {
    return (target: any) => {
        const original = target.prototype.constructor;
        original.prototype.options = original.prototype.options ||
            { servers: [], classes: [], clients: [], plugins: [] };
    };
}
