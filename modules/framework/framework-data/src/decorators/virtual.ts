import "reflect-metadata";
const metadataKey: string = 'odm';
/** the Virtual decorator registers the model with the odm
 *  @param {string} name - the name for the virtual property
 *  @param {string} collectionName - the name of the foreign collection.
 *  @param {model} model - the name of the foreign property.
 */
export function Virtual(name: string, collectionName: string, model?: any): any {
    let func = function (target, propertyKey: string, descriptor: PropertyDescriptor): any {
        let value: any[] = Reflect.getOwnMetadata(metadataKey, target) || [];
        value.push({
            'type': 'virtual',
            'collection': collectionName,
            'model': model
        });
        Reflect.defineMetadata(metadataKey, value, target);
    }
    return func;
}