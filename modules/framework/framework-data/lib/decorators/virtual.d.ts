import "reflect-metadata";
/** the Virtual decorator registers the model with the odm
 *  @param {string} name - the name for the virtual property
 *  @param {string} collectionName - the name of the foreign collection.
 *  @param {model} model - the name of the foreign property.
 */
export declare function Virtual(name: string, collectionName: string, model?: any): any;
