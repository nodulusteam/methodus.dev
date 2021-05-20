import 'reflect-metadata';
import { ODM } from './odm-models';
import { TransformDirection } from './enums';
import { ObjectID } from 'mongodb';
export declare function getOdm<T>(data: Array<{}> | {}): ODM<T>;
export declare class Odm {
    static applyODM(odm: ODM, filter: any): any;
    static transform<T extends Array<ArrTransform<T>> | object>(metadata: ODM, value: T, transformDirection?: TransformDirection): T;
    private static transofmer;
    private static transformValue;
    static applyObjectID(value: string): string | ObjectID;
    static parseToNumber(value: any): any;
}
export interface ArrTransform<T> {
    results: T[];
}
