import 'reflect-metadata'
import { Injector, RegistrationTypes } from '../injector';

export function Injectable(name?: string) {
    function DecoratorFactory(cls: any) {
        Injector.inject(RegistrationTypes.Service, cls, name);
        return cls;
    }
    return DecoratorFactory
}
