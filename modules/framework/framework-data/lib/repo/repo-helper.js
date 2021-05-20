"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoHelper = void 0;
const odm_1 = require("../odm");
const enums_1 = require("../enums/");
const _ = require("lodash");
class RepoHelper {
    constructor() { }
    static cleanOdm(data) {
        delete data.odm;
        delete data.modelType;
        try {
            delete data.__proto__.odm;
            Object.keys(data).forEach((key) => {
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
        }
        catch (e) {
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
    static transformIn(odm, data) {
        if (odm && odm.transform === enums_1.Transform.Automatic) {
            data = odm_1.Odm.transform(odm, data, enums_1.TransformDirection.IN);
        }
        return data;
    }
    /**
     *
     * @param odm - decleare the properties of the class and collection name
     * @param data - data to trasnform out from the database, for example => alert_title = alert.title.
     */
    static transformOut(odm, data) {
        if ((odm && odm.transform === enums_1.Transform.Automatic) && data) {
            data = odm_1.Odm.transform(odm, data, enums_1.TransformDirection.OUT);
        }
        return data;
    }
    static cleanIdForMongo(updateData) {
        const updateDataId = updateData.id || updateData._id;
        delete updateData.id;
        delete updateData._id;
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
exports.RepoHelper = RepoHelper;
//# sourceMappingURL=repo-helper.js.map