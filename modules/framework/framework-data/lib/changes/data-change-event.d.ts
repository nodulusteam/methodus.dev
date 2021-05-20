import { IChangesUpdater } from '../interfaces';
import { DataChange } from './data-changes';
export declare class DataChangeEvent<T = any> {
    collectionName: string;
    changesData?: DataChange;
    data?: T;
    context?: any;
    constructor(collectionName: string, changesData?: DataChange, data?: T, context?: any);
    NormalizeProperties(data: any, dataModel: any, collectionProps: Array<IChangesUpdater>): Promise<void>;
    private updateCollection;
}
