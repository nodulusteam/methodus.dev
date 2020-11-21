import 'reflect-metadata';
import { Dictionary, ClassRef } from '@methodus/framework-commons';
import { Injector } from '../container';
const ANNOTATIONS = '__annotations__';

export function Singleton(name?: string) {
    function DecoratorFactory(cls: ClassRef | any) {
        const annotations = cls.hasOwnProperty(ANNOTATIONS)
            ? (cls as Dictionary)[ANNOTATIONS]
            : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[
            ANNOTATIONS
            ];

        annotations.push('singleton');
        Injector.register(name || cls, {useValue: new cls()});

        return cls;
    }
    return DecoratorFactory;
}
