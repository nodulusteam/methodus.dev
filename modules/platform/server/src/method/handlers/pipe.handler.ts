import injection from '@methodus/framework-injection';
import { verbBasedMethod } from '../method-pipe';

@injection.Injectable('MethodPipeHandler')
export class MethodPipeHandler {
    methodDecorator(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>, ...args:any) {
        verbBasedMethod(target, propertyKey, descriptor,...args);
    }
}