
const diff = require('object-diff');
import * as _ from 'lodash'; 
import { DataChange, Changes as DataChanges } from '../changes';
/** our implemantaion of the rethink changes function. we need to find the diff between the current version and the new one
 *
 */
export class ChangesEvent {   
    public static findChanges(oldRecord: object, newRecord: object) {
        let dataChanged = new DataChange();
        let diffrence = ChangesEvent.getDifferences(oldRecord, newRecord);
        if (diffrence) {
            Object.assign(dataChanged.value, diffrence);
        }
        return dataChanged;
    }

   
    private static getDifferences(oldValue: object, newValue: object) {
        let differences = diff(oldValue, newValue);
        if (Object.keys(differences).length > 0) {
            let changeValue = new DataChanges();

            changeValue.new_value.properties = changeValue.old_value.properties = new Set(Object.keys(differences));
            changeValue.new_value.value = differences;
            changeValue.old_value.value = _.pick(oldValue, Object.keys(differences));

            return changeValue;
        }
        return null;
    }
}
