import { DBHandler } from '../connect';
import { ODM } from '../odm-models';
import { ReturnType } from '../enums/';
export declare class QueryFragmentElement {
    filter: any;
    isFragment: boolean;
    expression: any;
    constructor(filter: any);
    rootOperator(): string;
    and(filter: any | QueryFragmentElement): this;
    or(filter: any | QueryFragmentElement): this;
}
export declare function QueryFragment(filter: any): any;
/** Query object is used to perform data queries.
 *
 */
export declare class Query {
    private collectionName?;
    private transformAfterRun;
    private unTransformAfterRun;
    dbHandler: DBHandler;
    dbConnection: any;
    odm: ODM;
    model: any;
    private isPaging;
    allowDiskUse: boolean;
    private queryHelper;
    /** The collection for the query to execute against
     *  @param {string} collectionName - the name of the db (mongo) collection.
     */
    constructor(collectionName?: string | any);
    paging(pageNum: number | string, pageSize: number | string): Query;
    transform(): Query;
    unTransform(): Query;
    count(key: any): Query;
    limit(limit: number): Query;
    private orderTransform;
    order(fieldName: string | {}, direction?: string): Query;
    private setWeightValue;
    private buildWeightProjectData;
    private buildCondition;
    toQuery(options?: any): any[];
    merge(_from: string, _localField: string, _foreignField: string, _as: string): Query;
    /** coerce array to object.
     * @param {string} path - Field path to an array field. To specify a field path, prefix the field name with a dollar sign $ and enclose in quotes.
     * @param {string} arrayIndex - Optional. The name of a new field to hold the array index of the element. The name cannot start with a dollar sign $.
     * @param {boolean} preserveNullAndEmptyArrays - Optional. If true, if the path is null, missing, or an empty array, $unwind outputs the document. If false, $unwind does not output a document if the path is null, missing, or an empty array.
     */
    unwind(_path: string, _includeArrayIndex?: string, _preserveNullAndEmptyArrays?: boolean): Query;
    addFields(_addFields: Array<any>): Query;
    exists(...args: any[]): Query;
    notExists(...args: any[]): Query;
    or(filterHolder: any | QueryFragmentElement): Query;
    and(filterHolder: any | QueryFragmentElement): Query;
    group(options: any): Query;
    notIn(fieldName: string, options: Array<any>): Query;
    in(fieldName: string, options: Array<any>): Query;
    /**
     *
     * @param filterHolder Add filter to the predicate, no need to prepare it from outside
     */
    filter(filterHolder: QueryFragmentElement | any): Query;
    pluck(...args: any[]): Query;
    without(...args: any[]): Query;
    between(field: string, minVal: any, maxVal: any): this;
    run(returnType?: ReturnType): Promise<any>;
    private getAggregationOptions;
}
