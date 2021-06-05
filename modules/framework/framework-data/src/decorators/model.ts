
import 'reflect-metadata';
import { ODM } from '../odm-models';
import { logger } from '../logger';
const metadataKey: string = 'odm';
import { Transform } from '../enums/';
import { DBHandler } from '../connect';
import * as _ from 'lodash';
import { validate } from './validator';


/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 *  @param {Transform} transform - transformation settings for in/out.
 *  @param {Array<{}>} initialData - initial data for the collection.
 *  @param {boolean} broadcastChanges - whether to publish the changes for this entity or not.
 */
export function Model<T>(collectionName: string, transform: Transform = Transform.None, initialData: Array<{}> = null, broadcastChanges: boolean = false): any {
    return function (target): void {
        let odm: ODM<T> = Reflect.getMetadata(metadataKey, target.prototype);

        if (target.odm) { //inheritance mode
            odm = Object.assign(_.cloneDeep(target.odm), odm); //clone target odm to keep base class memebers
        }


        odm.collectionName = collectionName;
        odm.transform = transform;
        odm.broadcastChanges = broadcastChanges;
        Reflect.defineMetadata(metadataKey, odm, target);
        // TODO: To be removed if not needed
        target.prototype['validate'] = validate;
        target.odm = odm;
        target.prototype.odm = odm;
        // TODO:Ron: global as any????
        (global as any).models = (global as any).models || {};
        (global as any).models[collectionName] = { odm: odm };
        // createCollection(collectionName, odm, initialData);
    }

}

async function createCollection(collectionName, odm, initialData) {
    try {
        const connection = await DBHandler.getConnection(odm.connectionName);
        const list = await connection.listCollections({ name: collectionName }).toArray();
        if (!list.length) {
            await connection.createCollection(collectionName);
            logger.info(`created collection ${collectionName}`);
            if (initialData) {
                const response = await connection.collection(collectionName).insertMany(initialData);
                logger.info(response)
            }
        }
    }
    catch (err) {
        logger.error(err);
    }
}
