"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Odm = exports.getOdm = void 0;
require("reflect-metadata");
const odm_models_1 = require("./odm-models");
const enums_1 = require("./enums");
const mongodb_1 = require("mongodb");
const logger_1 = require("./logger");
const filter_1 = require("./filter/");
function getOdm(data) {
    const obj = Array.isArray(data) ? data[0] : data;
    let proto = obj.prototype;
    let odm = null;
    if (!proto) {
        proto = obj.__proto__;
    }
    if (proto && proto.constructor && proto.constructor.odm) {
        odm = proto.constructor.odm;
    }
    if (this.collectionName && this.collectionName.odm) {
        odm = this.collectionName.odm;
    }
    if (!odm) {
        if (obj.modelType && obj.modelType.odm) {
            odm = obj.modelType.odm;
        }
    }
    if (odm && odm.fields) {
        odm.schemaValidaor = buildScehmaValidator(odm.fields);
    }
    return odm;
}
exports.getOdm = getOdm;
function includeInMongoTypes(type) {
    const mongoFields = ['double',
        'string', 'object', 'array', 'binData', 'objectId',
        'bool', 'date', 'null', 'regex', 'javascript', 'javascriptWithScope',
        'int', 'timestamp', 'long', 'minKey', 'maxKey'];
    const returnType = type.toLowerCase();
    if (mongoFields.includes(returnType)) {
        return returnType;
    }
    return 'object';
}
function buildScehmaValidator(fields) {
    const schemaValidaor = {
        validator: {}
    };
    const $and = [];
    Object.keys(fields).forEach((key) => {
        if (key !== '_id') {
            const property = fields[key];
            const fieldDetails = property.fieldDetails;
            const type = fieldDetails && fieldDetails.type ? includeInMongoTypes(fieldDetails.type) : includeInMongoTypes(property.type);
            $and.push({
                [property.propertyKey]: { $type: type }
            });
        }
    });
    schemaValidaor.validator = {
        $and
    };
    return Object.assign(schemaValidaor, { validationAction: 'warn' });
}
class Odm {
    static applyODM(odm, filter) {
        let propertyKey = filter.filter_by;
        if (!propertyKey) {
            try {
                propertyKey = Object.keys(filter)[0];
            }
            catch (err) {
                logger_1.logger.error('Odm:: applyODM:: Error in catch. (swallowed)');
            }
        }
        if (odm && filter) {
            Object.keys(filter).forEach((key) => {
                if (odm.fields[key] && odm.fields[key].fieldDetails &&
                    odm.fields[key].fieldDetails.type === "identifier" /* identifier */ && filter[key]._bsontype !== "ObjectID" /* objectid */) {
                    filter_1.FilterServerUtility.singleOrArray(filter, mongodb_1.ObjectID, key);
                }
                else if (odm.fields[key] && odm.fields[key].fieldDetails && odm.fields[key].fieldDetails.type === "number" /* number */) {
                    filter_1.FilterServerUtility.singleOrArray(filter, Odm.parseToNumber, key);
                }
            });
        }
        return filter;
    }
    static transform(metadata, value, transformDirection) {
        if (!value) {
            return;
        }
        let result;
        if (Array.isArray(value)) {
            if (value[0].results) {
                value[0].results = value[0].results.map((element) => {
                    return this.transofmer(element, metadata, transformDirection);
                });
                result = value;
            }
            else {
                result = value.map((element) => {
                    return this.transofmer(element, metadata, transformDirection);
                });
            }
        }
        else {
            result = this.transofmer(value, metadata, transformDirection);
        }
        return result;
    }
    static transofmer(element, metadata, transformDirection) {
        return Object.keys(element).reduce((previousValue, currentValue, currentIndex, array) => {
            // TransformDirection.IN
            if (transformDirection === enums_1.TransformDirection.IN) {
                const keyElementMeta = Object.keys(metadata.fields).filter((key) => {
                    return metadata.fields[key] && metadata.fields[key].displayName === currentValue;
                }).pop();
                const transformOutMap = metadata.fields[keyElementMeta] || new odm_models_1.MetadataField();
                // transform normal string to bson type
                if (transformOutMap.fieldDetails.param === "ObjectID" /* objectid */.toLowerCase()) {
                    element[transformOutMap.displayName] = this.applyObjectID(element[transformOutMap.displayName]);
                }
                else if (transformOutMap.fieldDetails.param === "number" /* number */) {
                    element[transformOutMap.displayName] = this.parseToNumber(element[transformOutMap.displayName]);
                }
                return Object.assign(this.transformValue(element, currentValue, transformOutMap, transformOutMap.propertyKey), previousValue);
            }
            else {
                // TransformDirection.OUT
                const transformOutMap = metadata.fields[currentValue] || new odm_models_1.MetadataField();
                // transform bson type to normal string
                if (transformOutMap.fieldDetails && transformOutMap.fieldDetails.param === "ObjectID" /* objectid */.toLowerCase()) {
                    element[transformOutMap.propertyKey] = element[transformOutMap.propertyKey]
                        ? element[transformOutMap.propertyKey].toString() : element[transformOutMap.propertyKey];
                }
                return Object.assign(this.transformValue(element, currentValue, transformOutMap, transformOutMap.displayName), previousValue);
            }
        }, new Object());
    }
    static transformValue(element, currentValue, transformOutMap, key) {
        let tranfromObject;
        if (transformOutMap && transformOutMap.displayName && transformOutMap.propertyKey &&
            (transformOutMap.displayName !== transformOutMap.propertyKey)) {
            // make his key to be as the displayName
            tranfromObject = { [key]: element[currentValue] };
        }
        else {
            // leave it as it was
            tranfromObject = { [currentValue]: element[currentValue] };
        }
        return tranfromObject;
    }
    static applyObjectID(value) {
        try {
            return new mongodb_1.ObjectID(value);
        }
        catch (ex) {
            return value;
        }
    }
    static parseToNumber(value) {
        try {
            if (isNaN(value)) {
                throw new Error(`cannot convert ${value} to number`);
            }
            return +value;
        }
        catch (ex) {
            return value;
        }
    }
}
exports.Odm = Odm;
//# sourceMappingURL=odm.js.map