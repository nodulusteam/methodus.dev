"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lookup = void 0;
const odm_models_1 = require("../odm-models");
require("reflect-metadata");
const metadataKey = 'odm';
/** the Lookup decorator registers the model with the odm
 *  @param {string} modelName - the name for the virtual property
 *  @param {string} foreignProperty - the name of the foreign collection.
 *  @param {model} lookupKey - the name of the foreign property.
 */
function Lookup(source, contract, method, requestKey, resultProperty) {
    let func = (target, propertyKey, descriptor) => {
        const odm = Reflect.getOwnMetadata(metadataKey, target) || new odm_models_1.ODM();
        const field = odm.fields[propertyKey];
        if (!field) {
            throw new Error(`Field support decorators must be placed above field decorator. 
            Make sure field decorator is present.`);
        }
        field.lookupDetails = new odm_models_1.LookupDetails(source, contract, method, requestKey, resultProperty);
        Reflect.defineMetadata(metadataKey, odm, target);
    };
    return func;
}
exports.Lookup = Lookup;
//# sourceMappingURL=lookup.js.map