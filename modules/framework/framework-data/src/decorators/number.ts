import { getDecoratorByType } from './decorator_helper';
/** the IsoDate decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
export function Number(value?: any, mongoType?: string): any {
    return getDecoratorByType({
        type: mongoType || 'number',
        param: 'number',
        value: value
    });
}
