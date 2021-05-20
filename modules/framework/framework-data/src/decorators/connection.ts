
import 'reflect-metadata';
import { ODM } from '../odm-models';
import { logger } from '../logger';
const metadataKey: string = 'odm';
import * as _ from 'lodash';





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

