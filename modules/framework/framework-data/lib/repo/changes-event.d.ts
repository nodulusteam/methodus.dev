import { DataChange } from '../changes';
/** our implemantaion of the rethink changes function. we need to find the diff between the current version and the new one
 *
 */
export declare class ChangesEvent {
    static findChanges(oldRecord: object, newRecord: object): DataChange;
    private static getDifferences;
}
