import { MetadataField } from './metadata-field';
export class Fields<T> {
    [id: string]: MetadataField<T>
}