
import 'reflect-metadata';
import { ODM } from '../odm-models';
const metadataKey: string = 'odm';

/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 *  @param {boolean} broadcastChanges - whether to publish the changes for this entity or not.
 */
export function ModelInMemory<T>(collectionName: string, broadcastChanges: boolean = false): any {
    return function (target): void {
        let odm: ODM<T> = Reflect.getMetadata(metadataKey, target.prototype);
        odm.collectionName = collectionName;
        odm.broadcastChanges = broadcastChanges;
        Reflect.defineMetadata(metadataKey, odm, target);
        target.odm = odm;
        target.prototype.odm = odm;
    }
} 