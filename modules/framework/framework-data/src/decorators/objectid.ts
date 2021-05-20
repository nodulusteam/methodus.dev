import { getDecoratorByType } from './decorator_helper';
/** the ObjectId decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
export function ObjectId(name?: string): any {
    return getDecoratorByType({
        type: 'identifier',
        param:'objectid'
    });
}
