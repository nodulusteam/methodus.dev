import * as _ from 'lodash';
import { DBHandler } from '../connect';
import { Query } from '../query/query';
import { Odm, getOdm } from '../odm';
import { ODM } from '../odm-models';
import { ReturnType } from '../enums/';
import { logger } from '../logger';
import { DataChangeEvent } from '../changes';
import { EventDataEmitter } from '../emitter';
import { ChangesEvent } from './changes-event';
import { RepoHelper } from './repo-helper';

export abstract class Repo<T> /*implements IRepo*/ {
    private dataArray: any;
    private static odm: Odm;
    constructor(data?: {} | Array<{}>, modelType?: any) {
        /**
         * copy constructor
         */
        if (modelType) {
            (this as any).__proto__.modelType = modelType;
        }

        if (!data) {
            return;
        }

        if (Array.isArray(data)) {
            this.dataArray = data;
        } else {
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
    private static async _save(odm: ODM, data, dbConnection: any) {
        data = RepoHelper.transformIn(odm, data);
        data = RepoHelper.cleanOdm(data);

        const cleanObject = Object.assign({}, data);
        delete cleanObject[DBHandler.keyMode];
        let result = await dbConnection.collection(odm.collectionName).findOneAndUpdate(
            { [DBHandler.keyMode]: data[DBHandler.keyMode] },
            { $set: cleanObject },
            {
                returnOriginal: true,
                upsert: true,
            }
        );

        const changesData: any = ChangesEvent.findChanges(result, data);
        const eventData = new DataChangeEvent(odm.collectionName, changesData, data);
        EventDataEmitter.changes(`update::${odm.collectionName}`, eventData);

        if (Array.isArray(data)) {
            const dataArray = [data].reduce((acc, v) => acc.concat(v), new Array()).map((d, i) => Object.assign({ [DBHandler.keyMode]: result.result.upserted[i] }, d));
            if (dataArray.length > 0) {
                result = RepoHelper.transformOut(odm, dataArray);
            }
        } else {
            result = RepoHelper.transformOut(odm, data);
        }
        return Array.isArray(result) && result.length === 1 ? result[0] : result;
    }

    /**
     *
     * @param odm - decleare the properties of the class and collection name
     * @param data - data to save into collection
     * @param dbConnection - connection to database
     */

    private static async _insert(odm: ODM, data: {} | Array<{}>, dbConnection: any): Promise<{} | Array<{}>> {
        data = RepoHelper.transformIn(odm, data);
        data = RepoHelper.cleanOdm(data);

        let result;
        try {
            await this.createCollection(dbConnection, odm.collectionName, (odm as any).schemaValidaor);
        } catch (error) {
            // console.log('collection exists');
        }

        if (Array.isArray(data)) {
            result = await dbConnection.collection(odm.collectionName).insertMany(data);
        } else {
            result = await dbConnection.collection(odm.collectionName).insertOne(data);
        }
        result = RepoHelper.transformOut(odm, result.ops);
        const inserted = Array.isArray(result) && result.length === 1 ? result[0] : result;

        EventDataEmitter.emit('create::' + odm.collectionName, new DataChangeEvent(odm.collectionName, null, inserted));

        return inserted;
    }

    /**
     *
     * @param data - data to insert to database,
     */

    static async save<T>(data: {}) {
        const odm = getOdm<T>(data) || (this.odm as ODM);
        const connection = await DBHandler.getConnection(odm.connectionName);
        return (await Repo._save(odm, data, connection)) as T;
    }

    async save(): Promise<T> {
        const odm = getOdm<T>(this);
        const connection = await DBHandler.getConnection(odm.connectionName);
        return (await Repo._save(getOdm<T>(this), this, connection)) as T;
    }

    /**
     *
     * @param data - data to insert to database
     */

    static async insert<T>(data: T | T[]): Promise<T> {
        const odm = getOdm<T>(data) || (this.odm as ODM);
        const connection = await DBHandler.getConnection(odm.connectionName);
        return (await Repo._insert(odm, data, connection)) as T;
    }

    async insert(): Promise<T> {
        const odm = getOdm<T>(this);
        const data = this.dataArray || this;
        const connection = await DBHandler.getConnection(odm.connectionName);
        return (await Repo._insert(odm, data, connection)) as T;
    }

    /**
     *
     * @param _id - get document by id
     */

    static async get<T = any>(objectIdentifier: string): Promise<T> {
        const odm: ODM = getOdm(this);
        const connection = await DBHandler.getConnection(odm.connectionName);
        let result = await connection.collection(odm.collectionName).findOne(Odm.applyObjectID(objectIdentifier) as any);
        result = RepoHelper.transformOut(odm, result);
        return result as T;
    }

    static async update<T>(filter: any, dataToUpdate: T, upsert: boolean = false, replace: boolean = false): Promise<T> {
        const odm: ODM = getOdm<T>(dataToUpdate) || (this.odm as ODM);
        RepoHelper.cleanOdm(dataToUpdate);
        const filterTransformed = RepoHelper.transformIn(odm, filter);
        const connection = await DBHandler.getConnection(odm.connectionName);
        let originalObject = await connection.collection(odm.collectionName).find(filterTransformed).toArray();
        if (originalObject.length > 0) {
            originalObject = RepoHelper.transformOut(odm, originalObject[0]);
        }
        const finalResult = replace ? dataToUpdate : RepoHelper.smartMerge(originalObject, dataToUpdate);
        const dataToUpdateTransformed = RepoHelper.transformIn(odm, finalResult);
        const recordBefore = await connection.collection(odm.collectionName).findOneAndUpdate(filterTransformed, replace ? dataToUpdateTransformed : { $set: dataToUpdateTransformed }, {
            returnOriginal: true,
            upsert,
        });

        // proccess data after update/replace: transform out, merge and emit if needed
        if (recordBefore && recordBefore.ok && recordBefore.value) {
            const recordBeforeTransformed = RepoHelper.transformOut(odm, recordBefore.value);
            const finaltransform = replace ? dataToUpdate : RepoHelper.smartMerge(recordBeforeTransformed, dataToUpdate);
            const changesData: any = ChangesEvent.findChanges(recordBefore.value, finaltransform);

            const eventData = new DataChangeEvent(odm.collectionName, changesData, finaltransform);
            EventDataEmitter.changes(`update::${odm.collectionName}`, eventData);
            return finaltransform;
        }
    }

    static async updateMany<T>(filter: any, updateData: T, upsert: boolean = false) {
        const odm: any = getOdm<T>(updateData) || this.odm;
        const updateDataTransformed = RepoHelper.transformIn(odm, updateData);
        const updatedFilter = RepoHelper.transformIn(odm, filter);
        const connection = await DBHandler.getConnection(odm.connectionName);
        const result = await connection.collection(odm.collectionName).updateMany(
            updatedFilter,
            { $set: updateDataTransformed },
            {
                upsert,
            }
        );

        return result;
    }

    static async delete<T>(filter: any, model: T = null, justOne: boolean = true) {
        const odm: any = model ? getOdm<T>(model) : (this.odm as ODM);
        const connection = await DBHandler.getConnection(odm.connectionName);
        let result;

        const updatedFilter = RepoHelper.transformIn(odm, filter);

        if (justOne) {
            result = await connection.collection(odm.collectionName).deleteOne(updatedFilter);
        } else {
            result = await connection.collection(odm.collectionName).deleteMany(updatedFilter);
        }
        return result;
    }

    private static async _find(odm: ODM, filter, returnType: ReturnType = ReturnType.Multi) {
        const connection = await DBHandler.getConnection(odm.connectionName);
        let result = await connection.collection(odm.collectionName).find(filter).toArray();
        return returnType === ReturnType.Single ? result[0] : result;
    }

    async find(filter: any = {}, returnType: ReturnType = ReturnType.Multi) {
        const result = await Repo._find(getOdm<T>(this), filter, returnType);
        return result;
    }

    static async find(filter: any = {}, returnType: ReturnType = ReturnType.Multi) {
        const odm = this.odm as ODM;
        const result = await Repo._find(odm, filter, returnType);
        return result;
    }

    static async query(query: Query, returnType?: ReturnType) {
        return await query.run(returnType);
    }

    static async createCollection(db: any, collName: string, validator: any) {
        const collections = await db.collections();
        if (!collections.map((c) => c.s.name).includes(collName)) {
            try {
                await db.createCollection(collName, validator);
            } catch (error) {
                if (error.message.includes('Exists')) {
                    logger.warn(error);
                } else {
                    await db.createCollection(collName);
                    // logger.error(error);
                }
                //
            }
        }
    }
}
