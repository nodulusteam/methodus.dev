import 'reflect-metadata'
import { Injector } from './injector';

export function Injectable(nameToken?: string) {
    function DecoratorFactory(cls: any) {
        Injector.inject(cls, nameToken);
        return cls;
    }
    return DecoratorFactory
}
