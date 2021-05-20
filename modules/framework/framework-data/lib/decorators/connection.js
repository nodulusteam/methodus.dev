"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
require("reflect-metadata");
const metadataKey = 'odm';
/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
function Connection(connectionName) {
    return function (target) {
        let odm = Reflect.getMetadata(metadataKey, target.prototype);
        odm.connectionName = connectionName;
        Reflect.defineMetadata(metadataKey, odm, target);
        target.odm = odm;
    };
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map