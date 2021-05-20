'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterServerUtility = void 0;
const escapeRegExp = require("escape-string-regexp");
const mongodb_1 = require("mongodb");
const odm_1 = require("../odm");
const enums_1 = require("../enums/");
const logger_1 = require("../logger");
const AND = '$and';
const OR = '$or';
const FILTER_BY = 'filter_by';
class FilterServerUtility {
    constructor(instance) {
        this.filterTree = {
            'during': (filterDuring) => {
                const timeObject = this.buildTimeObject(filterDuring);
                return {
                    [filterDuring.filter_by]: {
                        $gte: timeObject.startTime,
                        $lte: timeObject.endTime
                    }
                };
            },
            'hasFields': (filterHasFields) => {
                const hasFields = {};
                hasFields[filterHasFields[FILTER_BY]] = {
                    '$exists': true
                };
                return hasFields;
            },
            'hasFields_not': (filterHasFieldsNot) => {
                const hasFieldsNot = {};
                hasFieldsNot[filterHasFieldsNot[FILTER_BY]] = {
                    '$exists': false
                };
                return hasFieldsNot;
            },
            'gt': (filterGT) => {
                const gt = {};
                gt[filterGT[FILTER_BY]] = {
                    '$gt': filterGT.value
                };
                return gt;
            },
            'gte': (filterGTE) => {
                const gte = {};
                gte[filterGTE[FILTER_BY]] = {
                    '$gte': filterGTE.value
                };
                return gte;
            },
            'lt': (filterLT) => {
                const lt = {};
                lt[filterLT[FILTER_BY]] = {
                    '$lt': filterLT.value
                };
                return lt;
            },
            'lte': (filterLTE) => {
                const lte = {};
                lte[filterLTE[FILTER_BY]] = {
                    '$lte': filterLTE.value
                };
                return lte;
            },
            'match': (filterMatch) => {
                return {
                    [filterMatch[FILTER_BY]]: {
                        '$in': [new RegExp(escapeRegExp(filterMatch.value), 'i')]
                    }
                };
            },
            'not_match': (filterNotMatch) => {
                return {
                    [filterNotMatch[FILTER_BY]]: {
                        '$nin': [new RegExp(escapeRegExp(filterNotMatch.value), 'i')]
                    }
                };
            },
            'include': (filterInclude) => {
                return {
                    [filterInclude[FILTER_BY]]: {
                        '$in': [new RegExp(escapeRegExp(filterInclude.value), 'i')]
                    }
                };
            },
            'not_include': (filterNotInclude) => {
                return {
                    [filterNotInclude[FILTER_BY]]: {
                        '$nin': [new RegExp(escapeRegExp(filterNotInclude.value), 'i')]
                    }
                };
            },
            'ne': (filterNE) => {
                const ne = {};
                ne[filterNE[FILTER_BY]] = {
                    '$ne': filterNE.value
                };
                return ne;
            },
            'eq': (filterEQ) => {
                let eq = {};
                eq[filterEQ[FILTER_BY]] = {
                    '$eq': filterEQ.value
                };
                return eq;
            },
            'default': (filterDefault) => {
                let defaul = {};
                defaul[filterDefault[FILTER_BY]] = {
                    '$eq': filterDefault.value
                };
                return defaul;
            }
        };
        this.model = instance;
    }
    handleODM(filter) {
        //let cloneFilter = JSON.parse(JSON.stringify(filter));
        let cloneFilter = filter;
        let propertyKey = filter.filter_by;
        if (!propertyKey) {
            try {
                propertyKey = Object.keys(cloneFilter)[0];
            }
            catch (err) {
            }
        }
        if (this.model && this.model.odm) {
            if (this.model.odm[propertyKey]) {
                if (this.model.odm[propertyKey].identifier === 'objectid') {
                    FilterServerUtility.singleOrArray(cloneFilter, mongodb_1.ObjectID, propertyKey);
                }
                else if (this.model.odm[propertyKey].type === 'number') {
                    FilterServerUtility.singleOrArray(cloneFilter, odm_1.Odm.parseToNumber, propertyKey);
                }
            }
            let foundDefinition = this.findInOdm(this.model.odm, propertyKey);
            if (foundDefinition) {
                filter.filter_by = foundDefinition.propertyKey;
            }
        }
        return cloneFilter;
    }
    findInOdm(odm, find) {
        for (let field in odm) {
            if (odm[field].displayName && odm[field].displayName === find)
                return odm[field];
        }
    }
    static singleOrArray(filter, func, propertyKey) {
        let keys = Object.keys(filter[propertyKey]);
        if (propertyKey.indexOf('$') === 0 && keys && keys.length > 0) {
            keys.forEach((key) => {
                filter[propertyKey][key] = this.singleOrArrayValue(filter[propertyKey][key], func, propertyKey);
            });
        }
        else if (filter.value) {
            filter.value = this.singleOrArrayValue(filter.value, func, propertyKey);
        }
        else {
            filter[propertyKey] = this.singleOrArrayValue(filter[propertyKey], func, propertyKey);
        }
        logger_1.logger.debug('singleOrArray  filter[propertyKey]', JSON.stringify(filter[propertyKey]));
    }
    static singleOrArrayValue(current, func, propertyKey) {
        let returnValue = {};
        if (Array.isArray(current)) {
            returnValue = current.map((curr) => {
                return func(curr);
            });
        }
        else {
            if (typeof current === 'object' && Object.keys(current).length > 0) {
                returnValue = Object.keys(current).map((key) => {
                    if (Array.isArray(current[key])) {
                        current[key] = current[key].map((item) => {
                            return func(item);
                        });
                    }
                    else {
                        current[key] = func(current[key]);
                    }
                    return current;
                });
            }
            else {
                returnValue = func(current);
            }
        }
        logger_1.logger.debug('singleOrArrayValue  returnValue', JSON.stringify(returnValue));
        return Array.isArray(returnValue) ? returnValue[0] : returnValue;
    }
    build(queryFilters, query, literal) {
        let filters = [], sortObject = [], filter;
        if (queryFilters && queryFilters.filters && Array.isArray(queryFilters.filters)) {
            queryFilters = queryFilters.filters;
        }
        if (Array.isArray(queryFilters)) {
            for (let i = 0; i < queryFilters.length; i++) {
                if (typeof queryFilters[i] === 'string') {
                    filter = JSON.parse(queryFilters[i]);
                }
                else {
                    filter = queryFilters[i];
                }
                //
                //Check to make sure filter object is not empty
                if (Object.keys(filter).length !== 0 && filter !== JSON.stringify({}) && !filter.order_by /*&& (filter.filter || filter.nested)*/) {
                    /*if (filter.filter === 'during') {
                        filter.value = this.getDateDuring(filter.value);
                    }*/
                    filters.push(filter);
                }
                else if (Object.keys(filter).length !== 0 && filter !== JSON.stringify({}) && filter.order_by) {
                    if (filter.filter) { // split filters into sort,filter.
                        const newFilter = Object.assign({}, filter);
                        delete newFilter.order_by;
                        delete newFilter.sort;
                        filters.push(newFilter);
                    }
                    sortObject.push({ order_by: filter.order_by, sort: filter.sort });
                }
            }
        }
        else {
            //TODO check to make sure JSON.parse will work
            if (typeof queryFilters === 'string') {
                filter = JSON.parse(queryFilters);
            }
            else {
                filter = queryFilters;
            }
            if (filter && Object.keys(filter).length !== 0 && filter !== JSON.stringify({})) {
                if (Array.isArray(filter)) {
                    Object.assign(filters, filter);
                }
                else {
                    filters.push(filter);
                }
            }
        }
        if (filters.length > 0 || sortObject.length > 0) {
            let fixedFilters = filters.filter(function (filter) {
                if (filter.value !== null && typeof filter.value !== 'undefined') {
                    let valueAsString = filter.value.toString();
                    return valueAsString !== '';
                }
                else {
                    if ((filter && typeof filter !== 'undefined') || Object.keys(filter).length > 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            });
            return this.makeFilterFunction(fixedFilters, literal, sortObject);
        }
        else {
            return {};
        }
    }
    buildTimeObject(duringer) {
        return {
            startTime: new Date(duringer.value.start),
            endTime: new Date(duringer.value.end)
        };
    }
    makeFilterFunction(filters, literal, sortObject) {
        let predicate, filterFunction, i;
        for (i = 0; i < filters.length; i++) {
            if (filters[i].filter_by) {
                //convert the filter property name using the transformation
                const convertedFilter = odm_1.Odm.transform(this.model.odm, { [filters[i].filter_by]: filters[i].value }, enums_1.TransformDirection.IN);
                if (convertedFilter && Object.keys(convertedFilter).length > 0) {
                    filters[i].filter_by = Object.keys(convertedFilter)[0];
                    filters[i].value = convertedFilter[filters[i].filter_by];
                }
                filters[i].literal = literal;
                const tempFilter = this.model.odm.fields[filters[i].filter_by];
                if ((tempFilter && tempFilter.type === 'Number') && !isNaN(filters[i].value)) {
                    filters[i].value = filters[i].value * 1;
                }
                predicate = this.makePredicate(filters[i])(this.handleODM(filters[i]));
            }
            else if (filters[i].nested) {
                predicate = this.makeFilterFunction(filters[i].nested, literal);
            }
            else if (typeof filters[i] === 'object') {
                predicate = this.handleODM(filters[i]);
            }
            filters[i].predicate = predicate;
            predicate = null;
        }
        filterFunction = filters && filters[0] ? filters[0] : null;
        let obj = {};
        let activeProperty;
        if (filterFunction) {
            switch (filterFunction.logic) {
                case 'or':
                    obj[OR] = [];
                    activeProperty = OR;
                    break;
                case 'and':
                default:
                    obj[AND] = [];
                    activeProperty = AND;
                    break;
            }
        }
        if (filters.length > 0) {
            for (let x = 0; x < filters.length; x++) {
                let currentPredicate = filters[x].predicate;
                if (currentPredicate.predicate) {
                    delete currentPredicate.predicate;
                }
                obj[activeProperty].push(currentPredicate);
            }
        }
        if (sortObject && sortObject.length > 0) {
            obj['$sort'] = sortObject;
        }
        logger_1.logger.debug('makeFilterFunction  obj', JSON.stringify(obj));
        return obj;
    }
    // private getDateDuring(value: any) {
    //     const start = new Date(value.start);
    //     const end = new Date(value.end);
    //     return { start, end };
    // }
    makePredicate(filter) {
        //let filterName = filter.filter + ((filter.logic) ? '_' + filter.logic : '');
        let filterTreeNode = this.filterTree[filter.filter] || this.filterTree['default'];
        if (filter.logic)
            filterTreeNode.logic = filter.logic;
        return filterTreeNode;
    }
}
exports.FilterServerUtility = FilterServerUtility;
//# sourceMappingURL=filter.js.map