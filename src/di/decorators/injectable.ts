import 'reflect-metadata'
import { Injector, RegistrationTypes } from '../injector';
import { ClassRef } from '../../interfaces';

export function Injectable(name?: string) {
    function DecoratorFactory(cls: ClassRef | any) {
        Injector.inject(RegistrationTypes.Service, cls, name);
        return cls;
    }
    return DecoratorFactory
}
