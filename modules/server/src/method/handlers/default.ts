import { Injectable } from '@methodus/framework-injection';
import { verbBasedMethod } from '../method';

@Injectable('MethodHandler')
export class MethodHandler {
    methodDecorator(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>, ...args:any) {
        verbBasedMethod(target, propertyKey, descriptor,...args);
    }
}