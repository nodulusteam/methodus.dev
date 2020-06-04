import 'reflect-metadata';
import { Injector, RegistrationTypes } from '../injector';
import { ClassRef, Dictionary } from '@methodus/framework-commons';
const ANNOTATIONS = '__annotations__';

export function Singleton(name?: string) {
    function DecoratorFactory(cls: ClassRef | any) {
        const annotations = cls.hasOwnProperty(ANNOTATIONS)
            ? (cls as Dictionary)[ANNOTATIONS]
            : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[
                  ANNOTATIONS
              ];

        annotations.push('singleton');

        Injector.inject(RegistrationTypes.Service, cls, name);

        return cls;
    }
    return DecoratorFactory;
}
