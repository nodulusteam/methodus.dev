import { ODM } from '../odm-models';
import { Operator } from '../enums/';
import { QueryFragmentElement } from '../';
export declare class QueryHelper {
    arrayActions: Array<any>;
    private _odm;
    initOdm(instanceOrModelName: any): ODM;
    findOperator(operator: Operator): any;
    buildOrAnd(match: any, operator: string | Operator, filterHolder: any, defaultOperator?: Operator): void;
    private setupMatch;
    recurseQueryFragmentExpression(fragment: QueryFragmentElement, primaryOperator?: string | Operator): {};
    /**
     *
     * @param match - the filter container in aggregation framework
     * @param operator - logic operator $or,$and
     * @param filterHolder - the actual filter expression
     */
    buildOrAndInsertIntoArray(match: any, operator: string | Operator, filterHolder: QueryFragmentElement | any): void;
    handleProject(keys: Array<string> | string, odm?: ODM): void;
    private getFilterHolderFromUtility;
}
