import { DBHandler } from '../connect';
import { Odm } from '../odm';
import { IUnWind, ISort } from '../interfaces';
import { ODM } from '../odm-models';
import { TransformDirection, Transform, ReturnType, Direction, Operator, ElementType } from '../enums/';
import { logger } from '../logger';
import { QueryHelper } from './query_helper';
import * as objStringify from 'obj-stringify';
import * as _ from 'lodash';

export class QueryFragmentElement {
    isFragment: boolean = true;
    expression: any = {};
    constructor(public filter: any) {
    }

    rootOperator() {
        return Object.keys(this.expression || {})[0];
    }
    and(filter: any | QueryFragmentElement) {
        let newFrag = filter;
        if (filter.isFragment) {
            newFrag = filter.filter;
        }

        this.expression[Operator.$AND] = this.expression[Operator.$AND] || [];
        this.expression[Operator.$AND].push(newFrag);
        return this;
    }
    or(filter: any | QueryFragmentElement) {
        this.expression[Operator.$OR] = this.expression[Operator.$OR] || [];
        this.expression[Operator.$OR].push(filter);
        return this;

    }
}
export function QueryFragment(filter): any {
    return new QueryFragmentElement(filter);
}

/** Query object is used to perform data queries.
 *   
 */
export class Query {
    private transformAfterRun: boolean = false;
    private unTransformAfterRun: boolean = false;
    dbHandler: DBHandler;
    dbConnection: any;
     
    odm: ODM;
    model: any;
    private isPaging: boolean = false;
    allowDiskUse: boolean = true;
    private queryHelper: QueryHelper;
    /** The collection for the query to execute against
     *  @param {string} collectionName - the name of the db (mongo) collection.
     */
    constructor(private collectionName?: string | any) {
        this.queryHelper = new QueryHelper();
        this.queryHelper.arrayActions = new Array<any>();
        this.odm = this.queryHelper.initOdm(collectionName);
    }

    paging(pageNum: number | string, pageSize: number | string): Query {
        if (pageNum && pageSize) {
            pageNum = +pageNum;
            pageSize = +pageSize;
            this.allowDiskUse = true;
        } else {
            return this;
        }

        const groupByColumns: any = {};
        this.isPaging = true;

        if (this.odm && Object.keys(this.odm.fields).length > 0) {

            Object.keys(this.odm.fields).forEach((key) => {
                const odmField = this.odm.fields[key];
                if (odmField && odmField.propertyKey) {
                    groupByColumns[odmField.propertyKey] = `$$ROOT.${odmField.propertyKey}`;
                }
            });
        }

        this.queryHelper.arrayActions.push({
            [Operator.$GROUP]: {
                '_id': null,
                'totalRows': {
                    $sum: 1
                },
                'results': {
                    $push: Object.keys(groupByColumns).length > 0 ? groupByColumns : '$$ROOT'
                }
            }
        }, {
                [Operator.$PROJECT]: {
                    total: '$totalRows',
                    results: {
                        $slice: ['$results', (pageSize * pageNum) - pageSize, pageSize]
                    }
                }
            });
        return this;
    }

    transform(): Query {
        this.transformAfterRun = true;
        return this;
    }

    unTransform(): Query {
        this.unTransformAfterRun = true;
        return this;
    }

    count(key): Query {
        this.queryHelper.arrayActions.push({
            [Operator.$GROUP]: {
                '_id': null,
                [key]: {
                    $sum: 1
                }
            }
        });
        return this;
    }

    limit(limit: number): Query {
        this.queryHelper.arrayActions.push({ [Operator.$LIMIT]: limit });
        return this;
    }

    private orderTransform(sortHolder) {
        if (this.odm && this.odm.transform === Transform.Automatic) {
            try {
                sortHolder = Odm.transform(this.odm, sortHolder, TransformDirection.IN);
            }
            catch (transformationError) {
                console.error(transformationError);
            }
        }
        return sortHolder;
    }
    order(fieldName: string | {}, direction?: string): Query {
        if (fieldName && typeof (fieldName) === 'string' && direction) {
            let sortHolder = { [fieldName]: direction };
            sortHolder = this.orderTransform(sortHolder);
            fieldName = Object.keys(sortHolder)[0];
            if (this.odm.fields[fieldName.toString()] &&
                this.odm.fields[fieldName.toString()].fieldDetails.type === ElementType.weight) {
                this.setWeightValue();
                fieldName = this.odm.fields[fieldName.toString()].fieldDetails.type;
            }
            this.queryHelper.arrayActions.push({ [Operator.$SORT]: { [fieldName.toString()]: Direction[direction] } });
        } else if (typeof (fieldName) === 'object') {
            try {
                let sortHolder = fieldName;
                sortHolder = this.orderTransform(sortHolder);
                this.queryHelper.arrayActions.push({ [Operator.$SORT]: sortHolder });
            }
            catch (transformationError) {
                console.error(transformationError);
            }
        }
        return this;
    }

    private setWeightValue() {
        let hasWeightField = false;
        Object.keys(this.odm.fields).forEach((odmKey) => {
            if (this.odm.fields[odmKey].fieldDetails.type === ElementType.weight) {
                hasWeightField = true;
            }
        });
        if (hasWeightField) {
            Object.keys(this.odm.fields).forEach((odmKey) => {
                if (this.odm.fields[odmKey] && this.odm.fields[odmKey].propertyKey) {
                    this.queryHelper.handleProject(this.odm.fields[odmKey].propertyKey);
                }
                const fieldDetails = this.odm.fields[odmKey].fieldDetails;
                if (fieldDetails.type === ElementType.weight) {
                    const conditionalProjection = this.buildWeightProjectData(fieldDetails.type,
                        odmKey,
                        fieldDetails.value);
                    let indexOfProject = -1;
                    this.queryHelper.arrayActions.forEach((currentArrayActionItem, currentArrayActionItemIndex) => {
                        let currentActionItemKey = Object.keys(currentArrayActionItem || {})[0];
                        if (currentActionItemKey === Operator.$PROJECT) {
                            indexOfProject = currentArrayActionItemIndex;
                        }
                    });
                    if (indexOfProject > -1) {
                        this.queryHelper.arrayActions[indexOfProject][Operator.$PROJECT][fieldDetails.type] = conditionalProjection[fieldDetails.type];
                    }
                    else {
                        this.queryHelper.arrayActions.push({ [Operator.$PROJECT]: conditionalProjection });
                    }
                }
            });
        }
    }

    private buildWeightProjectData(weightFieldName: string, fieldName: string, value: any) {
        let result = { [weightFieldName]: {} };
        let deepResult: any = {};
        let maxValue = 0;
        if (Array.isArray(value)) {
            value.forEach((currentValue, index) => {
                const currentKey = Object.keys(currentValue)[0];
                maxValue = maxValue > currentValue[currentKey] ? maxValue : (currentValue[currentKey] + 1);
                if (JSON.stringify(result[weightFieldName]) === '{}') {
                    result[weightFieldName] = this.buildCondition(
                        fieldName,
                        currentKey,
                        currentValue[currentKey]);
                    deepResult = result[weightFieldName]['$cond'];
                }
                else {
                    if (deepResult['else'] && deepResult['else']['$cond']) {
                        deepResult = deepResult['else']['$cond'];
                    }

                    deepResult['else'] = this.buildCondition(
                        fieldName,
                        currentKey,
                        currentValue[currentKey]);
                }
            });
        }

        if (deepResult['else']['$cond']['else'] === null) {
            deepResult['else']['$cond']['else'] = maxValue;
        }
        return result;
    }

    private buildCondition(eqParam: string, eqValue: string, thenValue: number, elseValue?: number) {
        return {
            $cond: {
                if: {
                    $eq: [
                        `$${eqParam}`,
                        eqValue
                    ]
                },
                then: thenValue,
                else: null
            }
        }
    }


    toQuery(options?: any) {
        return this.queryHelper.arrayActions;
    }

    merge(_from: string, _localField: string, _foreignField: string, _as: string): Query {
        if (_from && _localField && _foreignField && _as) {
            this.queryHelper.arrayActions.push({ [Operator.$LOOKUP]: { from: _from, localField: _localField, foreignField: _foreignField, as: _as } });
        }
        return this;
    }



    /** coerce array to object.
     * @param {string} path - Field path to an array field. To specify a field path, prefix the field name with a dollar sign $ and enclose in quotes.
     * @param {string} arrayIndex - Optional. The name of a new field to hold the array index of the element. The name cannot start with a dollar sign $.
     * @param {boolean} preserveNullAndEmptyArrays - Optional. If true, if the path is null, missing, or an empty array, $unwind outputs the document. If false, $unwind does not output a document if the path is null, missing, or an empty array.
     */
    unwind(_path: string, _includeArrayIndex?: string, _preserveNullAndEmptyArrays?: boolean): Query {

        let unwind: IUnWind = { path: _path, includeArrayIndex: _includeArrayIndex, preserveNullAndEmptyArrays: _preserveNullAndEmptyArrays };
        if (unwind) {
            if (!unwind.includeArrayIndex) {
                delete unwind.includeArrayIndex;
            }
            this.queryHelper.arrayActions.push({ [Operator.$UNWIND]: unwind })
        }
        return this;
    }

    addFields(_addFields: Array<any>): Query {
        _addFields.forEach((item) => {
            if (item && Object.keys(item).length > 0) {
                let key = Object.keys(item)[0];
                this.queryHelper.arrayActions.push({ [Operator.$ADDFIELDS]: { [key]: item[key] } });
            }
        });
        return this;
    }


    exists(...args: any[]): Query {

        let match = this.queryHelper.findOperator(Operator.$MATCH);
        args.forEach((filterKey: string) => {
            let existFilter = {
                '$and': [{
                    [filterKey]: {
                        "$exists": true
                    }
                },
                {
                    [filterKey]: {
                        "$ne": null
                    }
                },
                {
                    [filterKey]: {
                        "$ne": ''
                    }
                }]
            };
            this.queryHelper.buildOrAnd(match, null, existFilter, Operator.$AND);
        });
        return this;
    }

    notExists(...args: any[]): Query {
        let match = this.queryHelper.findOperator(Operator.$MATCH);
        args.forEach((filterKey: string) => {
            let existFilter = {
                '$or': [{
                    [filterKey]: {
                        "$exists": false
                    }
                },
                {
                    [filterKey]: {
                        "$eq": null
                    }
                },
                {
                    [filterKey]: {
                        "$eq": ''
                    }
                }]
            };
            this.queryHelper.buildOrAnd(match, null, existFilter);
        });


        return this;
    }

    or(filterHolder: any | QueryFragmentElement): Query {
        let match = this.queryHelper.findOperator(Operator.$MATCH);

        this.queryHelper.buildOrAnd(match, Operator.$OR, filterHolder);
        return this;
    }

    and(filterHolder: any | QueryFragmentElement): Query {
        let match = this.queryHelper.findOperator(Operator.$MATCH);

        this.queryHelper.buildOrAnd(match, Operator.$AND, filterHolder);
        return this;
    }


    group(options: any): Query {
        this.queryHelper.arrayActions.push({ [Operator.$GROUP]: options });
        this.allowDiskUse = true;
        return this;
    }


    notIn(fieldName: string, options: Array<any>): Query {
        let match = this.queryHelper.findOperator(Operator.$MATCH);
        this.queryHelper.buildOrAnd(match, null, {
            [fieldName]: {
                [Operator.$NIN]: options
            }
        });
        return this;
    }


    in(fieldName: string, options: Array<any>): Query {
        let match = this.queryHelper.findOperator(Operator.$MATCH);
        this.queryHelper.buildOrAnd(match, null, {
            [fieldName]: {
                [Operator.$IN]: options
            }
        });
        return this;
    }

    /**
     *
     * @param filterHolder Add filter to the predicate, no need to prepare it from outside
     */

    filter(filterHolder: QueryFragmentElement | any): Query {
        if ((this.odm && this.odm.transform === Transform.Automatic) && (filterHolder)) {
            try {
                filterHolder = Odm.transform(this.odm, filterHolder, TransformDirection.IN);
            }
            catch (transformationError) {
                console.error(transformationError);
            }
        } else {
            filterHolder = Odm.applyODM(this.odm, filterHolder);
        }
        let match = this.queryHelper.findOperator(Operator.$MATCH);
        if (filterHolder && filterHolder['$sort']) {
            let sort: ISort = filterHolder['$sort'][0];
            delete filterHolder['$sort'];
            if (
                this.odm.fields[sort.order_by] &&
                this.odm.fields[sort.order_by].fieldDetails.type === ElementType.weight) {
                sort.order_by = this.odm.fields[sort.order_by].fieldDetails.param;
                this.setWeightValue();
            }
            this.order(sort.order_by, sort.sort);
        }

        //add transformation;
        this.queryHelper.buildOrAnd(match, null, filterHolder, Operator.$AND);

        return this;
    }

    pluck(...args): Query {
        args.forEach((key) => {
            const odm = key.odm as ODM;
            if (!odm) {
                this.queryHelper.handleProject(key);
                return;
            }

            Object.keys(odm.fields).forEach((odmKey) => {
                if (odm.fields[odmKey] && odm.fields[odmKey].propertyKey) {
                    this.queryHelper.handleProject(odm.fields[odmKey].propertyKey);
                }
            });
        });
        return this;
    }

    without(...args): Query {
        args.forEach((key) => {
            let project = this.queryHelper.findOperator(Operator.$PROJECT);
            if (key === '_id') {
                project[Operator.$PROJECT][key] = 0;
            }
            else {
                delete project[Operator.$PROJECT][key];
            }
        });
        return this;
    }


    between(field: string, minVal: any, maxVal: any) {
        this.filter({ [field]: { $gte: minVal, $lte: maxVal } });
        return this;
    }


    async run(returnType: ReturnType = ReturnType.Multi) {
        this.dbConnection = await DBHandler.getConnection(this.odm.connectionName);
        if (this.isPaging) {
            returnType = ReturnType.Single;
        }
        const actualQuery = this.toQuery();
        try {
            // lets output the query text:
            const queryString = objStringify(actualQuery, { inline: true, indent: 0, singleQuotes: false });
            const baseString = `db.getCollection('${this.odm.collectionName}').aggregate(${queryString})`;
            logger.info(baseString);

        } catch (ex) { }

        try {
            let result = await this.dbConnection.collection(this.odm.collectionName)
                .aggregate(actualQuery, this.getAggregationOptions((this.allowDiskUse ? { allowDiskUse: true } : {}))).toArray();
            if (((this.odm && this.odm.transform === Transform.Automatic) || this.transformAfterRun) && (result && result.length > 0)) {
                try {
                    result = Odm.transform(this.odm, result, TransformDirection.OUT);
                } catch (transformationError) { }
            }

            if (result && result.length > 0) {
                return returnType === ReturnType.Single ? result[0] : result;
            } else {
                if (this.isPaging) {
                    return { results: [], total: 0 }
                    // default response for paging we need to keep the response the same
                } else if (result && result.length === 0 && returnType === ReturnType.Single) {
                    return null;
                }
            }
            return result;
        } catch (error) {
            // lets output the query text:
            const queryString = objStringify(this.toQuery(), { inline: true, indent: 0, singleQuotes: false });
            const baseString = `db.getCollection('${this.odm.collectionName}').aggregate(${queryString})`;
            throw (error);
        }
    }

    private getAggregationOptions(additionalOptions: {} = {}) {
        return Object.assign({}, additionalOptions);
    }
}
