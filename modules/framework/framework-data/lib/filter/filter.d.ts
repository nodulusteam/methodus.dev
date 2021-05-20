export interface ITimeObject {
    startTime: Date;
    endTime: Date;
}
export declare class FilterServerUtility {
    private model;
    constructor(instance: any);
    handleODM(filter: any): any;
    findInOdm(odm: any, find: any): any;
    static singleOrArray(filter: any, func: Function, propertyKey: string): void;
    static singleOrArrayValue(current: any, func: any, propertyKey: any): any;
    private filterTree;
    build(queryFilters?: any, query?: any, literal?: any): any;
    private buildTimeObject;
    private makeFilterFunction;
    private makePredicate;
}
