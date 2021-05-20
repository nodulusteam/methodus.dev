"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.QueryFragment = exports.QueryFragmentElement = void 0;
const connect_1 = require("../connect");
const odm_1 = require("../odm");
const enums_1 = require("../enums/");
const logger_1 = require("../logger");
const query_helper_1 = require("./query_helper");
const objStringify = require("obj-stringify");
class QueryFragmentElement {
    constructor(filter) {
        this.filter = filter;
        this.isFragment = true;
        this.expression = {};
    }
    rootOperator() {
        return Object.keys(this.expression || {})[0];
    }
    and(filter) {
        let newFrag = filter;
        if (filter.isFragment) {
            newFrag = filter.filter;
        }
        this.expression[enums_1.Operator.$AND] = this.expression[enums_1.Operator.$AND] || [];
        this.expression[enums_1.Operator.$AND].push(newFrag);
        return this;
    }
    or(filter) {
        this.expression[enums_1.Operator.$OR] = this.expression[enums_1.Operator.$OR] || [];
        this.expression[enums_1.Operator.$OR].push(filter);
        return this;
    }
}
exports.QueryFragmentElement = QueryFragmentElement;
function QueryFragment(filter) {
    return new QueryFragmentElement(filter);
}
exports.QueryFragment = QueryFragment;
/** Query object is used to perform data queries.
 *
 */
class Query {
    /** The collection for the query to execute against
     *  @param {string} collectionName - the name of the db (mongo) collection.
     */
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.transformAfterRun = false;
        this.unTransformAfterRun = false;
        this.isPaging = false;
        this.allowDiskUse = true;
        this.queryHelper = new query_helper_1.QueryHelper();
        this.queryHelper.arrayActions = new Array();
        this.odm = this.queryHelper.initOdm(collectionName);
    }
    paging(pageNum, pageSize) {
        if (pageNum && pageSize) {
            pageNum = +pageNum;
            pageSize = +pageSize;
            this.allowDiskUse = true;
        }
        else {
            return this;
        }
        const groupByColumns = {};
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
            [enums_1.Operator.$GROUP]: {
                '_id': null,
                'totalRows': {
                    $sum: 1
                },
                'results': {
                    $push: Object.keys(groupByColumns).length > 0 ? groupByColumns : '$$ROOT'
                }
            }
        }, {
            [enums_1.Operator.$PROJECT]: {
                total: '$totalRows',
                results: {
                    $slice: ['$results', (pageSize * pageNum) - pageSize, pageSize]
                }
            }
        });
        return this;
    }
    transform() {
        this.transformAfterRun = true;
        return this;
    }
    unTransform() {
        this.unTransformAfterRun = true;
        return this;
    }
    count(key) {
        this.queryHelper.arrayActions.push({
            [enums_1.Operator.$GROUP]: {
                '_id': null,
                [key]: {
                    $sum: 1
                }
            }
        });
        return this;
    }
    limit(limit) {
        this.queryHelper.arrayActions.push({ [enums_1.Operator.$LIMIT]: limit });
        return this;
    }
    orderTransform(sortHolder) {
        if (this.odm && this.odm.transform === enums_1.Transform.Automatic) {
            try {
                sortHolder = odm_1.Odm.transform(this.odm, sortHolder, enums_1.TransformDirection.IN);
            }
            catch (transformationError) {
                console.error(transformationError);
            }
        }
        return sortHolder;
    }
    order(fieldName, direction) {
        if (fieldName && typeof (fieldName) === 'string' && direction) {
            let sortHolder = { [fieldName]: direction };
            sortHolder = this.orderTransform(sortHolder);
            fieldName = Object.keys(sortHolder)[0];
            if (this.odm.fields[fieldName.toString()] &&
                this.odm.fields[fieldName.toString()].fieldDetails.type === "weight" /* weight */) {
                this.setWeightValue();
                fieldName = this.odm.fields[fieldName.toString()].fieldDetails.type;
            }
            this.queryHelper.arrayActions.push({ [enums_1.Operator.$SORT]: { [fieldName.toString()]: enums_1.Direction[direction] } });
        }
        else if (typeof (fieldName) === 'object') {
            try {
                let sortHolder = fieldName;
                sortHolder = this.orderTransform(sortHolder);
                this.queryHelper.arrayActions.push({ [enums_1.Operator.$SORT]: sortHolder });
            }
            catch (transformationError) {
                console.error(transformationError);
            }
        }
        return this;
    }
    setWeightValue() {
        let hasWeightField = false;
        Object.keys(this.odm.fields).forEach((odmKey) => {
            if (this.odm.fields[odmKey].fieldDetails.type === "weight" /* weight */) {
                hasWeightField = true;
            }
        });
        if (hasWeightField) {
            Object.keys(this.odm.fields).forEach((odmKey) => {
                if (this.odm.fields[odmKey] && this.odm.fields[odmKey].propertyKey) {
                    this.queryHelper.handleProject(this.odm.fields[odmKey].propertyKey);
                }
                const fieldDetails = this.odm.fields[odmKey].fieldDetails;
                if (fieldDetails.type === "weight" /* weight */) {
                    const conditionalProjection = this.buildWeightProjectData(fieldDetails.type, odmKey, fieldDetails.value);
                    let indexOfProject = -1;
                    this.queryHelper.arrayActions.forEach((currentArrayActionItem, currentArrayActionItemIndex) => {
                        let currentActionItemKey = Object.keys(currentArrayActionItem || {})[0];
                        if (currentActionItemKey === enums_1.Operator.$PROJECT) {
                            indexOfProject = currentArrayActionItemIndex;
                        }
                    });
                    if (indexOfProject > -1) {
                        this.queryHelper.arrayActions[indexOfProject][enums_1.Operator.$PROJECT][fieldDetails.type] = conditionalProjection[fieldDetails.type];
                    }
                    else {
                        this.queryHelper.arrayActions.push({ [enums_1.Operator.$PROJECT]: conditionalProjection });
                    }
                }
            });
        }
    }
    buildWeightProjectData(weightFieldName, fieldName, value) {
        let result = { [weightFieldName]: {} };
        let deepResult = {};
        let maxValue = 0;
        if (Array.isArray(value)) {
            value.forEach((currentValue, index) => {
                const currentKey = Object.keys(currentValue)[0];
                maxValue = maxValue > currentValue[currentKey] ? maxValue : (currentValue[currentKey] + 1);
                if (JSON.stringify(result[weightFieldName]) === '{}') {
                    result[weightFieldName] = this.buildCondition(fieldName, currentKey, currentValue[currentKey]);
                    deepResult = result[weightFieldName]['$cond'];
                }
                else {
                    if (deepResult['else'] && deepResult['else']['$cond']) {
                        deepResult = deepResult['else']['$cond'];
                    }
                    deepResult['else'] = this.buildCondition(fieldName, currentKey, currentValue[currentKey]);
                }
            });
        }
        if (deepResult['else']['$cond']['else'] === null) {
            deepResult['else']['$cond']['else'] = maxValue;
        }
        return result;
    }
    buildCondition(eqParam, eqValue, thenValue, elseValue) {
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
        };
    }
    toQuery(options) {
        return this.queryHelper.arrayActions;
    }
    merge(_from, _localField, _foreignField, _as) {
        if (_from && _localField && _foreignField && _as) {
            this.queryHelper.arrayActions.push({ [enums_1.Operator.$LOOKUP]: { from: _from, localField: _localField, foreignField: _foreignField, as: _as } });
        }
        return this;
    }
    /** coerce array to object.
     * @param {string} path - Field path to an array field. To specify a field path, prefix the field name with a dollar sign $ and enclose in quotes.
     * @param {string} arrayIndex - Optional. The name of a new field to hold the array index of the element. The name cannot start with a dollar sign $.
     * @param {boolean} preserveNullAndEmptyArrays - Optional. If true, if the path is null, missing, or an empty array, $unwind outputs the document. If false, $unwind does not output a document if the path is null, missing, or an empty array.
     */
    unwind(_path, _includeArrayIndex, _preserveNullAndEmptyArrays) {
        let unwind = { path: _path, includeArrayIndex: _includeArrayIndex, preserveNullAndEmptyArrays: _preserveNullAndEmptyArrays };
        if (unwind) {
            if (!unwind.includeArrayIndex) {
                delete unwind.includeArrayIndex;
            }
            this.queryHelper.arrayActions.push({ [enums_1.Operator.$UNWIND]: unwind });
        }
        return this;
    }
    addFields(_addFields) {
        _addFields.forEach((item) => {
            if (item && Object.keys(item).length > 0) {
                let key = Object.keys(item)[0];
                this.queryHelper.arrayActions.push({ [enums_1.Operator.$ADDFIELDS]: { [key]: item[key] } });
            }
        });
        return this;
    }
    exists(...args) {
        let match = this.queryHelper.findOperator(enums_1.Operator.$MATCH); // || { [Operator.$MATCH]: { '$and': [] } };
        args.forEach((filterKey) => {
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
            this.queryHelper.buildOrAnd(match, null, existFilter, enums_1.Operator.$AND);
        });
        return this;
    }
    notExists(...args) {
        let match = this.queryHelper.findOperator(enums_1.Operator.$MATCH);
        args.forEach((filterKey) => {
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
    or(filterHolder) {
        let match = this.queryHelper.findOperator(enums_1.Operator.$MATCH);
        this.queryHelper.buildOrAnd(match, enums_1.Operator.$OR, filterHolder);
        return this;
    }
    and(filterHolder) {
        let match = this.queryHelper.findOperator(enums_1.Operator.$MATCH);
        this.queryHelper.buildOrAnd(match, enums_1.Operator.$AND, filterHolder);
        return this;
    }
    group(options) {
        this.queryHelper.arrayActions.push({ [enums_1.Operator.$GROUP]: options });
        this.allowDiskUse = true;
        return this;
    }
    notIn(fieldName, options) {
        let match = this.queryHelper.findOperator(enums_1.Operator.$MATCH);
        this.queryHelper.buildOrAnd(match, null, {
            [fieldName]: {
                [enums_1.Operator.$NIN]: options
            }
        });
        return this;
    }
    in(fieldName, options) {
        let match = this.queryHelper.findOperator(enums_1.Operator.$MATCH);
        this.queryHelper.buildOrAnd(match, null, {
            [fieldName]: {
                [enums_1.Operator.$IN]: options
            }
        });
        return this;
    }
    /**
     *
     * @param filterHolder Add filter to the predicate, no need to prepare it from outside
     */
    filter(filterHolder) {
        if ((this.odm && this.odm.transform === enums_1.Transform.Automatic) && (filterHolder)) {
            try {
                filterHolder = odm_1.Odm.transform(this.odm, filterHolder, enums_1.TransformDirection.IN);
            }
            catch (transformationError) {
                console.error(transformationError);
            }
        }
        else {
            filterHolder = odm_1.Odm.applyODM(this.odm, filterHolder);
        }
        let match = this.queryHelper.findOperator(enums_1.Operator.$MATCH);
        if (filterHolder && filterHolder['$sort']) {
            let sort = filterHolder['$sort'][0];
            delete filterHolder['$sort'];
            if (this.odm.fields[sort.order_by] &&
                this.odm.fields[sort.order_by].fieldDetails.type === "weight" /* weight */) {
                sort.order_by = this.odm.fields[sort.order_by].fieldDetails.param;
                this.setWeightValue();
            }
            this.order(sort.order_by, sort.sort);
        }
        //add transformation;
        this.queryHelper.buildOrAnd(match, null, filterHolder, enums_1.Operator.$AND);
        return this;
    }
    pluck(...args) {
        args.forEach((key) => {
            const odm = key.odm;
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
    without(...args) {
        args.forEach((key) => {
            let project = this.queryHelper.findOperator(enums_1.Operator.$PROJECT);
            if (key === '_id') {
                project[enums_1.Operator.$PROJECT][key] = 0;
            }
            else {
                delete project[enums_1.Operator.$PROJECT][key];
            }
        });
        return this;
    }
    between(field, minVal, maxVal) {
        this.filter({ [field]: { $gte: minVal, $lte: maxVal } });
        return this;
    }
    async run(returnType = enums_1.ReturnType.Multi) {
        this.dbConnection = await connect_1.DBHandler.getConnection(this.odm.connectionName);
        if (this.isPaging) {
            returnType = enums_1.ReturnType.Single;
        }
        const actualQuery = this.toQuery();
        try {
            // lets output the query text:
            const queryString = objStringify(actualQuery, { inline: true, indent: 0, singleQuotes: false });
            const baseString = `db.getCollection('${this.odm.collectionName}').aggregate(${queryString})`;
            logger_1.logger.info(baseString);
        }
        catch (ex) { }
        try {
            let result = await this.dbConnection.collection(this.odm.collectionName)
                .aggregate(actualQuery, this.getAggregationOptions((this.allowDiskUse ? { allowDiskUse: true } : {}))).toArray();
            if (((this.odm && this.odm.transform === enums_1.Transform.Automatic) || this.transformAfterRun) && (result && result.length > 0)) {
                try {
                    result = odm_1.Odm.transform(this.odm, result, enums_1.TransformDirection.OUT);
                }
                catch (transformationError) { }
            }
            if (result && result.length > 0) {
                return returnType === enums_1.ReturnType.Single ? result[0] : result;
            }
            else {
                if (this.isPaging) {
                    return { results: [], total: 0 };
                    // default response for paging we need to keep the response the same
                }
                else if (result && result.length === 0 && returnType === enums_1.ReturnType.Single) {
                    return null;
                }
            }
            return result;
        }
        catch (error) {
            // lets output the query text:
            const queryString = objStringify(this.toQuery(), { inline: true, indent: 0, singleQuotes: false });
            const baseString = `db.getCollection('${this.odm.collectionName}').aggregate(${queryString})`;
            throw (error);
        }
    }
    getAggregationOptions(additionalOptions = {}) {
        return Object.assign({}, additionalOptions);
    }
}
exports.Query = Query;
/*export class QueryFragment{
    constructor(filter: any) {
        return {}
    }
}*/
//# sourceMappingURL=query.js.map