import 'reflect-metadata'
import { Injector, RegistrationTypes } from '../injector';
const ANNOTATIONS = '__annotations__';

export function Singleton(name?: string) {
    function DecoratorFactory(cls: any) {

        const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
            cls[ANNOTATIONS] :
            Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];

        annotations.push('singleton');

        Injector.inject(RegistrationTypes.Service, cls, name);
        
        return cls;
    }
    return DecoratorFactory
}
