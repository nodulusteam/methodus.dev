import { getDecoratorByType } from './decorator_helper';
/** the IsoDate decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
export function IsoDate(name?: string): any {
    return getDecoratorByType({
        type: 'date',
        param: 'isodate'
    });
}
