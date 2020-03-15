import 'reflect-metadata';
import { RegistrationTypes, Injector } from '../../di';
import { ModuleTargetClass } from '../../interfaces';
 


/** the Module decorator registers a module
 */
export function Module(name?: string) {
    return (target: ModuleTargetClass) => {
        const original = target.prototype.constructor;
        original.prototype.options = original.prototype.options || { servers: [], classes: [], clients: [], plugins: [] };

        if (name) {
            original.prototype.options.name = name;
        }

        Injector.inject(RegistrationTypes.Module, target, name);
    };
}
