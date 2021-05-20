"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repo = void 0;
const connect_1 = require("../connect");
const odm_1 = require("../odm");
const enums_1 = require("../enums/");
const logger_1 = require("../logger");
const changes_1 = require("../changes");
const emitter_1 = require("../emitter");
const changes_event_1 = require("./changes-event");
const repo_helper_1 = require("./repo-helper");
class Repo {
    constructor(data, modelType) {
        /**
         * copy constructor
         */
        if (modelType) {
            this.__proto__.modelType = modelType;
        }
        if (!data) {
            return;
        }
        if (Array.isArray(data)) {
            this.dataArray = data;
        }
        else {
            Object.keys(data).forEach((key) => {
                this[key] = data[key];
            });
        }
    }
    /**
     *
     * @param odm - declare the properties of the class and collection name
     * @param data - data to save into collection
     * @param dbConnection - connection to database
     */
    static async _save(odm, data, dbConnection) {
        data = repo_helper_1.RepoHelper.transformIn(odm, data);
        data = repo_helper_1.RepoHelper.cleanOdm(data);
        const cleanObject = Object.assign({}, data);
        delete cleanObject[connect_1.DBHandler.keyMode];
        let result = await dbConnection.collection(odm.collectionName)
            .findOneAndUpdate({ [connect_1.DBHandler.keyMode]: data[connect_1.DBHandler.keyMode] }, { $set: cleanObject }, {
            returnOriginal: true,
            upsert: true
        });
        const changesData = changes_event_1.ChangesEvent.findChanges(result, data);
        const eventData = new changes_1.DataChangeEvent(odm.collectionName, changesData, data);
        emitter_1.EventDataEmitter.changes(`update::${odm.collectionName}`, eventData);
        if (Array.isArray(data)) {
            const dataArray = [data].
                reduce((acc, v) => acc.concat(v), new Array()).
                map((d, i) => Object.assign({ [connect_1.DBHandler.keyMode]: result.result.upserted[i] }, d));
            if (dataArray.length > 0) {
                result = repo_helper_1.RepoHelper.transformOut(odm, dataArray);
            }
        }
        else {
            result = repo_helper_1.RepoHelper.transformOut(odm, data);
        }
        return Array.isArray(result) && result.length === 1 ? result[0] : result;
    }
    /**
     *
     * @param odm - decleare the properties of the class and collection name
     * @param data - data to save into collection
     * @param dbConnection - connection to database
     */
    static async _insert(odm, data, dbConnection) {
        data = repo_helper_1.RepoHelper.transformIn(odm, data);
        data = repo_helper_1.RepoHelper.cleanOdm(data);
        let result;
        try {
            await this.createCollection(dbConnection, odm.collectionName, odm.schemaValidaor);
        }
        catch (error) {
            console.log('collection exists');
        }
        if (Array.isArray(data)) {
            result = await dbConnection.collection(odm.collectionName).insertMany(data);
        }
        else {
            result = await dbConnection.collection(odm.collectionName).insertOne(data);
        }
        result = repo_helper_1.RepoHelper.transformOut(odm, result.ops);
        const inserted = Array.isArray(result) && result.length === 1 ? result[0] : result;
        emitter_1.EventDataEmitter.emit('create::' + odm.collectionName, new changes_1.DataChangeEvent(odm.collectionName, null, inserted));
        return inserted;
    }
    /**
     *
     * @param data - data to insert to database,
     */
    static async save(data) {
        const odm = odm_1.getOdm(data) || this.odm;
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        return await Repo._save(odm, data, connection);
    }
    async save() {
        const odm = odm_1.getOdm(this);
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        return await Repo._save(odm_1.getOdm(this), this, connection);
    }
    /**
     *
     * @param data - data to insert to database
     */
    static async insert(data) {
        const odm = odm_1.getOdm(data) || this.odm;
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        return await Repo._insert(odm, data, connection);
    }
    async insert() {
        const odm = odm_1.getOdm(this);
        const data = this.dataArray || this;
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        return await Repo._insert(odm, data, connection);
    }
    /**
     *
     * @param _id - get document by id
     */
    static async get(objectIdentifier) {
        const odm = odm_1.getOdm(this);
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        let result = await connection.collection(odm.collectionName).findOne(odm_1.Odm.applyObjectID(objectIdentifier));
        result = repo_helper_1.RepoHelper.transformOut(odm, result);
        return result;
    }
    static async update(filter, dataToUpdate, upsert = false, replace = false) {
        const odm = odm_1.getOdm(dataToUpdate) || this.odm;
        repo_helper_1.RepoHelper.cleanOdm(dataToUpdate);
        const filterTransformed = repo_helper_1.RepoHelper.transformIn(odm, filter);
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        let originalObject = await connection.collection(odm.collectionName)
            .find(filterTransformed).toArray();
        if (originalObject.length > 0) {
            originalObject = repo_helper_1.RepoHelper.transformOut(odm, originalObject[0]);
        }
        const finalResult = replace ? dataToUpdate : repo_helper_1.RepoHelper.smartMerge(originalObject, dataToUpdate);
        const dataToUpdateTransformed = repo_helper_1.RepoHelper.transformIn(odm, finalResult);
        const recordBefore = await connection.collection(odm.collectionName)
            .findOneAndUpdate(filterTransformed, replace ? dataToUpdateTransformed : { $set: dataToUpdateTransformed }, {
            returnOriginal: true,
            upsert,
        });
        // proccess data after update/replace: transform out, merge and emit if needed
        if (recordBefore && recordBefore.ok && recordBefore.value) {
            const recordBeforeTransformed = repo_helper_1.RepoHelper.transformOut(odm, recordBefore.value);
            const finaltransform = replace ? dataToUpdate : repo_helper_1.RepoHelper.smartMerge(recordBeforeTransformed, dataToUpdate);
            const changesData = changes_event_1.ChangesEvent.findChanges(recordBefore.value, finaltransform);
            const eventData = new changes_1.DataChangeEvent(odm.collectionName, changesData, finaltransform);
            emitter_1.EventDataEmitter.changes(`update::${odm.collectionName}`, eventData);
            return finaltransform;
        }
    }
    static async updateMany(filter, updateData, upsert = false) {
        const odm = odm_1.getOdm(updateData) || this.odm;
        const updateDataTransformed = repo_helper_1.RepoHelper.transformIn(odm, updateData);
        const updatedFilter = repo_helper_1.RepoHelper.transformIn(odm, filter);
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        const result = await connection.collection(odm.collectionName)
            .updateMany(updatedFilter, { $set: updateDataTransformed }, {
            upsert,
        });
        return result;
    }
    static async delete(filter, model = null, justOne = true) {
        const odm = model ? odm_1.getOdm(model) : this.odm;
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        let result;
        const updatedFilter = repo_helper_1.RepoHelper.transformIn(odm, filter);
        if (justOne) {
            result = await connection.collection(odm.collectionName).deleteOne(updatedFilter);
        }
        else {
            result = await connection.collection(odm.collectionName).deleteMany(updatedFilter);
        }
        return result;
    }
    static async _find(odm, filter, returnType = enums_1.ReturnType.Multi) {
        const connection = await connect_1.DBHandler.getConnection(odm.connectionName);
        let result = await connection.collection(odm.collectionName).find(filter).toArray();
        return returnType === enums_1.ReturnType.Single ? result[0] : result;
    }
    async find(filter = {}, returnType = enums_1.ReturnType.Multi) {
        const result = await Repo._find(odm_1.getOdm(this), filter, returnType);
        return result;
    }
    static async find(filter = {}, returnType = enums_1.ReturnType.Multi) {
        const odm = this.odm;
        const result = await Repo._find(odm, filter, returnType);
        return result;
    }
    static async query(query, returnType) {
        return await query.run(returnType);
    }
    static async createCollection(db, collName, validator) {
        const collections = await db.collections();
        if (!collections.map(c => c.s.name).includes(collName)) {
            try {
                await db.createCollection(collName, validator);
            }
            catch (error) {
                logger_1.logger.error(error);
                await db.createCollection(collName);
            }
        }
    }
}
exports.Repo = Repo;
//# sourceMappingURL=repo.js.map