import 'reflect-metadata';
import { ClassRef } from '@methodus/framework-commons';
import { Injector } from '../container';

export function Injectable(name?: string) {
    function DecoratorFactory(cls: ClassRef | any) {
        Injector.register(name || cls, {useClass: cls});
        return cls;
    }
    return DecoratorFactory;
}
