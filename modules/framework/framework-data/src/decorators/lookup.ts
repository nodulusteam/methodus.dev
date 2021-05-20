

import { ODM, LookupDetails } from '../odm-models';

import "reflect-metadata";
import { logger } from '../logger';
const metadataKey: string = 'odm';
import { Transform, TransformDirection } from '../enums/';
/** the Lookup decorator registers the model with the odm
 *  @param {string} modelName - the name for the virtual property
 *  @param {string} foreignProperty - the name of the foreign collection.
 *  @param {model} lookupKey - the name of the foreign property.
 */
export function Lookup(source: string, contract: string, method: string, requestKey: string, resultProperty: string): any {
    let func =
        (target, propertyKey: string, descriptor: PropertyDescriptor): any => {
            const odm: ODM = Reflect.getOwnMetadata(metadataKey, target) || new ODM();
            const field = odm.fields[propertyKey];
            if (!field) {
                throw new Error(`Field support decorators must be placed above field decorator. 
            Make sure field decorator is present.`)
            }
            field.lookupDetails = new LookupDetails(source, contract, method, requestKey, resultProperty);
            Reflect.defineMetadata(metadataKey, odm, target);
        }


    return func;
}



