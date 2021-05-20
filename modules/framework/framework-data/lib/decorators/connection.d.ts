import 'reflect-metadata';
/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
export declare function Connection<T>(connectionName: string): any;
