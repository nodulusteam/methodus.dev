"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const odm_models_1 = require("../odm-models");
const metadataKey = 'odm';
/** the model decorator registers the model with the odm
 *  @param {string} name - the display .
 */
function Field(displayName, classType) {
    let func = function (target, propertyKey, descriptor) {
        const odm = Reflect.getOwnMetadata(metadataKey, target) || new odm_models_1.ODM();
        odm.fields[propertyKey] = {
            displayName: displayName ? displayName : propertyKey,
            propertyKey: propertyKey,
            type: getFieldType(target, propertyKey),
            odm: classType,
            fieldDetails: new odm_models_1.FieldDetails()
        };
        Reflect.defineMetadata(metadataKey, odm, target);
    };
    return func;
}
exports.Field = Field;
/**
 get the type of the requested field(typescript type,(string,Object,etc...)).
 */
function getFieldType(target, propertyKey) {
    const fieldType = Reflect.getMetadata("design:type", target, propertyKey);
    return (fieldType && fieldType.name) ? fieldType.name : 'any';
}
//# sourceMappingURL=field.js.map