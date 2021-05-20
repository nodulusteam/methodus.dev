import { ODM } from '../odm-models';
import { Odm } from '../odm';
import { TransformDirection, Transform } from '../enums/';
import * as _ from 'lodash';
export class RepoHelper {
    constructor() { }
    static cleanOdm(data) {
        delete data.odm;
        delete data.modelType;
        try {
            delete data.__proto__.odm;
            Object.keys(data).forEach((key: any) => {
                if (typeof (data[key]) === 'object') {
                    try {
                        const item = data[key];
                        delete item.odm;
                        delete item.modelType;
                        delete item.__proto__.odm;
                    }
                    catch (e) {
                        // no need to log this
                        // logger.error(e);
                    }
                }
            });
        } catch (e) {
            // no need to log this
            // logger.error(e);
        }
        return data;
    }
    /**
     *
     * @param odm  - decleare the properties of the class and collection name
     * @param data - data to trasnform into the database, for example => alert.title = alert_title.
     */

    static transformIn(odm: ODM, data) {
        if (odm && odm.transform === Transform.Automatic) {
            data = Odm.transform(odm, data, TransformDirection.IN);
        }

        return data;
    }
    /**
     *
     * @param odm - decleare the properties of the class and collection name
     * @param data - data to trasnform out from the database, for example => alert_title = alert.title.
     */

    static transformOut(odm: ODM, data) {
        if ((odm && odm.transform === Transform.Automatic) && data) {
            data = Odm.transform(odm, data, TransformDirection.OUT);
        }
        return data;
    }

    static cleanIdForMongo<T>(updateData: T) {
        const updateDataId: string = (updateData as any).id || (updateData as any)._id;
        delete (updateData as any).id;
        delete (updateData as any)._id;
        return updateDataId;
    }

    /** merge object and extend array values */
    static smartMerge(oldValue, newValue) {
        const oldValueCloned = _.extend({}, oldValue);
        return _.mergeWith(oldValueCloned, newValue, (objValue, srcValue) => {
            if (_.isArray(objValue) && _.isArray(srcValue)) {
                return srcValue;
            }
        });
    }

}