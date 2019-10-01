import 'reflect-metadata'
import { Injector } from './injector';
const ANNOTATIONS = '__annotations__';

export function Injectable(name?: string) {
    function DecoratorFactory(cls: any) {

        const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
            (cls as any)[ANNOTATIONS] :
            Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];

        const constructorArgs = Reflect.getOwnMetadata('design:paramtypes', cls);
        Injector.register(cls, constructorArgs,name);
        annotations.push('injectable');
        return cls;

    }
    return DecoratorFactory
}
