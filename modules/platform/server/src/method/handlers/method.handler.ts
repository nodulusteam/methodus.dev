import injection from '@methodus/framework-injection';
import { verbBasedMethod } from '../method';

@injection.Injectable('MethodHandler')
export class MethodHandler {
    methodDecorator(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>, ...args:any) {
        verbBasedMethod(target, propertyKey, descriptor,...args);
    }
}