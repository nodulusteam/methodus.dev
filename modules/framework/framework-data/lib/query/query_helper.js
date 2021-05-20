"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHelper = void 0;
const odm_1 = require("../odm");
const odm_models_1 = require("../odm-models");
const enums_1 = require("../enums/");
const direction_1 = require("../enums/direction");
const _ = require("lodash");
class QueryHelper {
    initOdm(instanceOrModelName) {
        if (typeof instanceOrModelName === 'string') {
            if (global.models[instanceOrModelName]) {
                return global.models[instanceOrModelName].odm;
            }
            const odm = new odm_models_1.ODM();
            odm.collectionName = instanceOrModelName;
            this._odm = odm;
            return odm;
        }
        if (!instanceOrModelName.odm) {
            let odm = odm_1.getOdm(instanceOrModelName);
            if (odm) {
                instanceOrModelName.collectionName = odm.collectionName;
                let globalModel = global.models[odm.collectionName];
                if (globalModel) {
                    instanceOrModelName.odm = globalModel.odm;
                }
                else {
                    throw (new Error('no model found for ${odm.collectionName}'));
                }
                return odm;
            }
        }
        else {
            return instanceOrModelName.odm;
        }
    }
    findOperator(operator) {
        let returnItem = null;
        /*let copyArr = JSON.parse(JSON.stringify(this.arrayActions));
        let xxx = this.clone();*/
        [...this.arrayActions].reverse().forEach((item) => {
            let key = Object.keys(item)[0];
            if (key === operator) {
                returnItem = item;
            }
        });
        this.arrayActions.reverse();
        return returnItem;
    }
    buildOrAnd(match, operator, filterHolder, defaultOperator) {
        /**
         * no operator found,
         * this is probably the begining of the query,
         * so the match element is free of an operator and
         * is located of the match array.
         */
        if (filterHolder && filterHolder['$sort']) {
            let sortObj = filterHolder['$sort'][0];
            delete filterHolder['$sort'];
            this.arrayActions.push({ [enums_1.Operator.$SORT]: { [sortObj.order_by]: direction_1.Direction[sortObj.sort] } });
        }
        if (!operator && match) {
            operator = Object.keys(match[enums_1.Operator.$MATCH])[0];
        }
        /**
         * there is no operator and there is also no match,
         * so we will create a default match and default operator parameter.
         */
        if (filterHolder._isFragment) {
            operator = filterHolder.rootOperator();
        }
        if (!operator) {
            operator = defaultOperator || enums_1.Operator.$AND;
            if (!match)
                match = {
                    [enums_1.Operator.$MATCH]: { [operator]: [] }
                };
        }
        this.buildOrAndInsertIntoArray(match, operator, filterHolder);
        // handle fragment
        // if (filterHolder._isFragment && filterHolder.expression && Object.keys(filterHolder.expression)) {
        //     Object.keys(filterHolder.expression).map((nestedOperator) => {
        //         this.buildOrAndInsertIntoArray(match, nestedOperator, filterHolder.expression[nestedOperator]);
        //     });
        // }
    }
    setupMatch(match, operator) {
        if (!match) {
            match = {
                [enums_1.Operator.$MATCH]: { [operator]: null }
            };
        }
        if (match[enums_1.Operator.$MATCH][operator] === undefined) {
            let inner = JSON.parse(JSON.stringify(match[enums_1.Operator.$MATCH]));
            match[enums_1.Operator.$MATCH] = { [operator]: [inner] };
        }
        return match;
    }
    recurseQueryFragmentExpression(fragment, primaryOperator) {
        // const nextOperator = Object.keys(fragment.expression || {})[0];
        let returnObject = {};
        if (Object.keys(fragment.expression || {}).length > 0) {
            Object.keys(fragment.expression || {}).forEach(nextOperator => {
                const tempArray = fragment.expression[nextOperator].map(element => {
                    if (element._isFragment) {
                        const nextResult = this.recurseQueryFragmentExpression(element, nextOperator);
                        return nextResult;
                    }
                    else {
                        return [fragment.filter, element];
                    }
                });
                returnObject[nextOperator] = _.flatten([fragment.filter, ...tempArray]);
                // Object.assign(returnObject, { [nextOperator]: _.flatten(tempArray) });
            });
        }
        else {
            returnObject = fragment.filter; //[primaryOperator] = [fragment.filter];
        }
        return returnObject;
        // const nextOperator = Object.keys(filterHolder.expression || {})[0];
        // if (operator !== nextOperator) {
        //     let temp = match[Operator.$MATCH][operator];
        //     match[Operator.$MATCH][nextOperator] = [temp, filterHolder.expression[nextOperator]];
        // }
    }
    /**
     *
     * @param match - the filter container in aggregation framework
     * @param operator - logic operator $or,$and
     * @param filterHolder - the actual filter expression
     */
    buildOrAndInsertIntoArray(match, operator, filterHolder) {
        let isMatch = false;
        if (filterHolder._isFragment) {
            match = this.setupMatch(match, operator);
            const fragmentResult = this.recurseQueryFragmentExpression(filterHolder, operator);
            match[enums_1.Operator.$MATCH] = fragmentResult;
            //match[Operator.$MATCH][operator] = match[Operator.$MATCH][operator].concat(this.getFilterHolderFromUtility(filterHolder.filter, operator));
            // const nextOperator = Object.keys(filterHolder.expression || {})[0];
            // if (operator !== nextOperator) {
            //     let temp = match[Operator.$MATCH][operator];
            //     match[Operator.$MATCH][nextOperator] = [temp, filterHolder.expression[nextOperator]];
            // }
        }
        else if (Array.isArray(filterHolder)) {
            match = this.setupMatch(match, operator);
            if (!match[enums_1.Operator.$MATCH][operator])
                match[enums_1.Operator.$MATCH][operator] = [];
            match[enums_1.Operator.$MATCH][operator] = match[enums_1.Operator.$MATCH][operator].concat(this.getFilterHolderFromUtility(filterHolder, operator));
        }
        else {
            match = this.setupMatch(match, operator);
            if (Array.isArray(match[enums_1.Operator.$MATCH][operator])) {
                if (!match[enums_1.Operator.$MATCH][operator])
                    match[enums_1.Operator.$MATCH][operator] = [];
                match[enums_1.Operator.$MATCH][operator] = match[enums_1.Operator.$MATCH][operator].concat(this.getFilterHolderFromUtility(filterHolder, operator));
            }
            else {
                match[enums_1.Operator.$MATCH][operator] = [this.getFilterHolderFromUtility(filterHolder, operator)];
            }
        }
        //TODO: check case when we have one filter and we want to add anoter one
        /*if (this.arrayActions.indexOf(Operator.$MATCH) < 0) {
            //if (this.arrayActions.length === 0) {
            this.arrayActions.push(match);
        }*/
        //let arrayActionsKeys = Object.keys(this.arrayActions);
        let arrActionsKeys = this.arrayActions.map((item) => Object.keys(item || {})[0]);
        if (arrActionsKeys.indexOf(enums_1.Operator.$MATCH) < 0) {
            this.arrayActions.push(match);
        }
    }
    handleProject(keys, odm) {
        let opProject = this.findOperator(enums_1.Operator.$PROJECT);
        const keysArray = [keys].reduce((acc, v) => acc.concat(v), new Array());
        let key = keysArray.reduce((acc, v) => Object.assign({ [v]: 1 }, acc), new Object());
        if (typeof keys === 'object') {
            key = keys;
        }
        if (opProject) {
            Object.assign(opProject[enums_1.Operator.$PROJECT], key);
        }
        else {
            opProject = { [enums_1.Operator.$PROJECT]: key };
            this.arrayActions.push(opProject);
        }
    }
    getFilterHolderFromUtility(filterHolder, operator) {
        let actualFilter = filterHolder;
        if (filterHolder[operator]) {
            actualFilter = filterHolder[operator];
        }
        return actualFilter;
    }
}
exports.QueryHelper = QueryHelper;
//# sourceMappingURL=query_helper.js.map