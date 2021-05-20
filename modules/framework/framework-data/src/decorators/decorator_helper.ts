import "reflect-metadata";
import { logger } from '../logger';
import { Transform, TransformDirection } from '../enums/';
import { ODM, FieldDetails } from '../odm-models';

const metadataKey: string = 'odm';

// TODO:Ron: shouldn't this function be called something like setDecoratorMetadata?
export function getDecoratorByType(fieldDetails: FieldDetails) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor): any {
        const odm: ODM = Reflect.getOwnMetadata(metadataKey, target) || new ODM();
        const field = odm.fields[propertyKey];
        if(!field){
            throw new Error(`Field support decorators must be placed above field decorator. 
            Make sure field decorator is described.`)
        }
        field.fieldDetails = fieldDetails;
        Reflect.defineMetadata(metadataKey, odm, target);
    }
}















