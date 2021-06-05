import "reflect-metadata";
import { ODM, FieldDetails } from '../odm-models';

const metadataKey: string = 'odm';

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
