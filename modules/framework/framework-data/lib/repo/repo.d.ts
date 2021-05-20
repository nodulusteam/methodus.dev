import { Query } from '../query/query';
import { ReturnType } from '../enums/';
export declare abstract class Repo<T> {
    private dataArray;
    private static odm;
    constructor(data?: {} | Array<{}>, modelType?: any);
    /**
     *
     * @param odm - declare the properties of the class and collection name
     * @param data - data to save into collection
     * @param dbConnection - connection to database
     */
    private static _save;
    /**
     *
     * @param odm - decleare the properties of the class and collection name
     * @param data - data to save into collection
     * @param dbConnection - connection to database
     */
    private static _insert;
    /**
     *
     * @param data - data to insert to database,
     */
    static save<T>(data: {}): Promise<T>;
    save(): Promise<T>;
    /**
     *
     * @param data - data to insert to database
     */
    static insert<T>(data: T | T[]): Promise<T>;
    insert(): Promise<T>;
    /**
     *
     * @param _id - get document by id
     */
    static get<T = any>(objectIdentifier: string): Promise<T>;
    static update<T>(filter: any, dataToUpdate: T, upsert?: boolean, replace?: boolean): Promise<T>;
    static updateMany<T>(filter: any, updateData: T, upsert?: boolean): Promise<import("mongodb").UpdateWriteOpResult>;
    static delete<T>(filter: any, model?: T, justOne?: boolean): Promise<any>;
    private static _find;
    find(filter?: any, returnType?: ReturnType): Promise<any>;
    static find(filter?: any, returnType?: ReturnType): Promise<any>;
    static query(query: Query, returnType?: ReturnType): Promise<any>;
    static createCollection(db: any, collName: string, validator: any): Promise<void>;
}
