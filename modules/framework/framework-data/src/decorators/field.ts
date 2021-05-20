import { ODM, FieldDetails, Fields } from '../odm-models';
import { getDecoratorByType } from './decorator_helper';
const metadataKey: string = 'odm';

/** the model decorator registers the model with the odm
 *  @param {string} name - the display .
 */
export function Field<T>(displayName?: string, classType?: new () => T): any {
    let func = function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
        const odm: ODM<T> = Reflect.getOwnMetadata(metadataKey, target) || new ODM();
        odm.fields[propertyKey] = {
            displayName: displayName ? displayName : propertyKey,
            propertyKey: propertyKey,
            type: getFieldType(target, propertyKey),
            odm: classType,
            fieldDetails: new FieldDetails()
        }
        Reflect.defineMetadata(metadataKey, odm, target);
    }
    return func;
}
/**
 get the type of the requested field(typescript type,(string,Object,etc...)).
 */
function getFieldType(target: any, propertyKey: string): string {
    const fieldType = Reflect.getMetadata("design:type", target, propertyKey);
    return (fieldType && fieldType.name) ? fieldType.name : 'any';
}
