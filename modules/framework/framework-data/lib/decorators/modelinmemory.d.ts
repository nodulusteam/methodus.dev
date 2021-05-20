import 'reflect-metadata';
/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 *  @param {boolean} broadcastChanges - whether to publish the changes for this entity or not.
 */
export declare function ModelInMemory<T>(collectionName: string, broadcastChanges?: boolean): any;
