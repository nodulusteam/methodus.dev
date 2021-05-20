"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelInMemory = void 0;
require("reflect-metadata");
const metadataKey = 'odm';
/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 *  @param {boolean} broadcastChanges - whether to publish the changes for this entity or not.
 */
function ModelInMemory(collectionName, broadcastChanges = false) {
    return function (target) {
        let odm = Reflect.getMetadata(metadataKey, target.prototype);
        odm.collectionName = collectionName;
        odm.broadcastChanges = broadcastChanges;
        Reflect.defineMetadata(metadataKey, odm, target);
        target.odm = odm;
        target.prototype.odm = odm;
    };
}
exports.ModelInMemory = ModelInMemory;
//# sourceMappingURL=modelinmemory.js.map