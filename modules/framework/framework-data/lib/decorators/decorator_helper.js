"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorByType = void 0;
require("reflect-metadata");
const odm_models_1 = require("../odm-models");
const metadataKey = 'odm';
// TODO:Ron: shouldn't this function be called something like setDecoratorMetadata?
function getDecoratorByType(fieldDetails) {
    return function (target, propertyKey, descriptor) {
        const odm = Reflect.getOwnMetadata(metadataKey, target) || new odm_models_1.ODM();
        const field = odm.fields[propertyKey];
        if (!field) {
            throw new Error(`Field support decorators must be placed above field decorator. 
            Make sure field decorator is described.`);
        }
        field.fieldDetails = fieldDetails;
        Reflect.defineMetadata(metadataKey, odm, target);
    };
}
exports.getDecoratorByType = getDecoratorByType;
//# sourceMappingURL=decorator_helper.js.map