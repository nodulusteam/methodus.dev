import 'reflect-metadata'
import { Injector } from './injector';
const ANNOTATIONS = '__annotations__';

export function Injectable(nameToken?: string) {
    function DecoratorFactory(cls: any) {
        //use the injectable logic here
        Injector.inject(cls, nameToken);
        return cls;
    }
    return DecoratorFactory
}
