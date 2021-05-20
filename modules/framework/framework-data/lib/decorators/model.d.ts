import 'reflect-metadata';
import { Transform } from '../enums/';
/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 *  @param {Transform} transform - transformation settings for in/out.
 *  @param {Array<{}>} initialData - initial data for the collection.
 *  @param {boolean} broadcastChanges - whether to publish the changes for this entity or not.
 */
export declare function Model<T>(collectionName: string, transform?: Transform, initialData?: Array<{}>, broadcastChanges?: boolean): any;
