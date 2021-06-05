import { FieldDetails } from './field-details';
import { LookupDetails } from './lookup-details';

export class MetadataField<T = any> {
    displayName: string;
    propertyKey: string;
    type: string;
    // TODO odm should be changed to classType name as it is best describes it
    odm: new () => T;
    fieldDetails: FieldDetails;
    lookupDetails?: LookupDetails;
    constructor() {
        this.fieldDetails = new FieldDetails();
    }
}
