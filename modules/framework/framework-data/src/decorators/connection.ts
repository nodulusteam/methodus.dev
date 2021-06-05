
import 'reflect-metadata';
import { ODM } from '../odm-models';
const metadataKey: string = 'odm';





/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
export function Connection<T>(connectionName: string): any {
    return function (target): void {
        let odm: ODM<T> = Reflect.getMetadata(metadataKey, target.prototype);
        odm.connectionName = connectionName;
        Reflect.defineMetadata(metadataKey, odm, target);
        target.odm = odm;
    }
}

