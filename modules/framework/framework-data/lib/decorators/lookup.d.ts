import "reflect-metadata";
/** the Lookup decorator registers the model with the odm
 *  @param {string} modelName - the name for the virtual property
 *  @param {string} foreignProperty - the name of the foreign collection.
 *  @param {model} lookupKey - the name of the foreign property.
 */
export declare function Lookup(source: string, contract: string, method: string, requestKey: string, resultProperty: string): any;
