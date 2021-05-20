import { Transform } from '../enums';
import { Fields } from './fields';
export declare class ODM<T = any> {
    transform: Transform;
    broadcastChanges: boolean;
    collectionName: string;
    fields: Fields<T>;
    connectionName: string;
    constructor();
}
