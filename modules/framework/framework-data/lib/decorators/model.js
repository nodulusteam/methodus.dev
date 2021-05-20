"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
require("reflect-metadata");
const logger_1 = require("../logger");
const metadataKey = 'odm';
const enums_1 = require("../enums/");
const connect_1 = require("../connect");
const _ = require("lodash");
const validator_1 = require("./validator");
/** the model decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 *  @param {Transform} transform - transformation settings for in/out.
 *  @param {Array<{}>} initialData - initial data for the collection.
 *  @param {boolean} broadcastChanges - whether to publish the changes for this entity or not.
 */
function Model(collectionName, transform = enums_1.Transform.None, initialData = null, broadcastChanges = false) {
    return function (target) {
        let odm = Reflect.getMetadata(metadataKey, target.prototype);
        if (target.odm) { //inheritance mode
            odm = Object.assign(_.cloneDeep(target.odm), odm); //clone target odm to keep base class memebers
        }
        odm.collectionName = collectionName;
        odm.transform = transform;
        odm.broadcastChanges = broadcastChanges;
        Reflect.defineMetadata(metadataKey, odm, target);
        // TODO: To be removed if not needed
        target.prototype['validate'] = validator_1.validate;
        target.odm = odm;
        target.prototype.odm = odm;
        // TODO:Ron: global as any????
        global.models = global.models || {};
        global.models[collectionName] = { odm: odm };
        // createCollection(collectionName, odm, initialData);
    };
}
exports.Model = Model;
async function createCollection(collectionName, odm, initialData) {
    try {
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        const list = await connection.listCollections({ name: collectionName }).toArray();
        if (!list.length) {
            await connection.createCollection(collectionName);
            logger_1.logger.info(`created collection ${collectionName}`);
            if (initialData) {
                const response = await connection.collection(collectionName).insertMany(initialData);
                logger_1.logger.info(response);
            }
        }
    }
    catch (err) {
        logger_1.logger.error(err);
    }
}
//# sourceMappingURL=model.js.map