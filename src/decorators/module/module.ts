
import 'reflect-metadata';
import { RegistrationTypes, Injector } from '../../di';

/** the Module decorator registers a module
 */
export function Module(name?: string) {
    return (target: any) => {
        const original = target.prototype.constructor;
        original.prototype.options = original.prototype.options ||
            { servers: [], classes: [], clients: [], plugins: [] };
            
        if (name) {
            original.prototype.options.name = name;
        }

        Injector.inject(RegistrationTypes.Module, target, name);
        
    };
}
