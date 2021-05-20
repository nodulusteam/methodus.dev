import { FieldDetails } from './field-details';
import { LookupDetails } from './lookup-details';
export declare class MetadataField<T = any> {
    displayName: string;
    propertyKey: string;
    type: string;
    odm: new () => T;
    fieldDetails: FieldDetails;
    lookupDetails?: LookupDetails;
    constructor();
}
