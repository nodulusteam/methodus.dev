import "reflect-metadata";
import { FieldDetails } from '../odm-models';
export declare function getDecoratorByType(fieldDetails: FieldDetails): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
