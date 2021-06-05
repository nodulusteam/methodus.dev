import { getDecoratorByType } from './decorator_helper';
import { FieldDetails } from '../odm-models';
/** the IsoDate decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
export function Weight(value?: any): any {
    return getDecoratorByType({
        type: 'weight',
        param: 'weight',
        value: value
    });
}
