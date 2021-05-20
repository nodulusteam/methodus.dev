"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Virtual = void 0;
require("reflect-metadata");
const metadataKey = 'odm';
/** the Virtual decorator registers the model with the odm
 *  @param {string} name - the name for the virtual property
 *  @param {string} collectionName - the name of the foreign collection.
 *  @param {model} model - the name of the foreign property.
 */
function Virtual(name, collectionName, model) {
    let func = function (target, propertyKey, descriptor) {
        let value = Reflect.getOwnMetadata(metadataKey, target) || [];
        value.push({
            'type': 'virtual',
            'collection': collectionName,
            'model': model
        });
        Reflect.defineMetadata(metadataKey, value, target);
    };
    return func;
}
exports.Virtual = Virtual;
//# sourceMappingURL=virtual.js.map