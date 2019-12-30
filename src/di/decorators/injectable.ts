import 'reflect-metadata'
import { Injector } from '../injector';

export function Injectable(name?: string) {
    function DecoratorFactory(cls: any) {
        Injector.inject(cls, name);
        return cls;
    }
    return DecoratorFactory
}
