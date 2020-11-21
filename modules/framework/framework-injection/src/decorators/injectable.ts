import 'reflect-metadata';
import { ClassRef } from '@methodus/framework-commons';
import { Injector } from '../container';


// container.register<Foo>(Foo, {useClass: Foo});
// container.register<Bar>(Bar, {useValue: new Bar()});
// container.register<Baz>("MyBaz", {useValue: new Baz()});


export function Injectable(name?: string) {
    function DecoratorFactory(cls: ClassRef | any) {
        Injector.register(name || cls, {useClass: cls});
        return cls;
    }
    return DecoratorFactory;
}
