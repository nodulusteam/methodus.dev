import { ODM } from '../odm-models';
export declare class RepoHelper {
    constructor();
    static cleanOdm(data: any): any;
    /**
     *
     * @param odm  - decleare the properties of the class and collection name
     * @param data - data to trasnform into the database, for example => alert.title = alert_title.
     */
    static transformIn(odm: ODM, data: any): any;
    /**
     *
     * @param odm - decleare the properties of the class and collection name
     * @param data - data to trasnform out from the database, for example => alert_title = alert.title.
     */
    static transformOut(odm: ODM, data: any): any;
    static cleanIdForMongo<T>(updateData: T): string;
    /** merge object and extend array values */
    static smartMerge(oldValue: any, newValue: any): any;
}
