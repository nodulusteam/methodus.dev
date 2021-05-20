"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataChangeEvent = void 0;
const logger_1 = require("../logger");
const connect_1 = require("../connect");
const odm_1 = require("../odm");
class DataChangeEvent {
    constructor(collectionName, changesData, data, context) {
        this.collectionName = collectionName;
        this.changesData = changesData;
        this.data = data;
        this.context = context;
    }
    async NormalizeProperties(data, dataModel, collectionProps) {
        let changesId = data.id || data._id;
        let newValues = this.changesData.value.new_value;
        collectionProps.forEach(async (collectionProp) => {
            newValues.property.forEach(async (propertyName, index) => {
                if (propertyName === collectionProp.updatedPropertyName) {
                    await this.updateCollection(dataModel, collectionProp, newValues.value[propertyName], changesId);
                }
            });
        });
    }
    async updateCollection(dataModel, collectionProp, value, id) {
        let commentData = new dataModel({
            [collectionProp.value]: value
        });
        try {
            delete commentData['modelType'];
            delete commentData['odm'];
            const connection = await connect_1.DBHandler.getConnection();
            const result = await connection.collection(this.collectionName).updateMany({
                [collectionProp.key]: odm_1.Odm.applyObjectID(id)
            }, { $set: commentData });
        }
        catch (ex) {
            logger_1.logger.error(this, ex);
        }
    }
}
exports.DataChangeEvent = DataChangeEvent;
//# sourceMappingURL=data-change-event.js.map