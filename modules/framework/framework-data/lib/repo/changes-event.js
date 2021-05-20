"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangesEvent = void 0;
const diff = require('object-diff');
const _ = require("lodash");
const changes_1 = require("../changes");
/** our implemantaion of the rethink changes function. we need to find the diff between the current version and the new one
 *
 */
class ChangesEvent {
    static findChanges(oldRecord, newRecord) {
        let dataChanged = new changes_1.DataChange();
        let diffrence = ChangesEvent.getDifferences(oldRecord, newRecord);
        if (diffrence) {
            Object.assign(dataChanged.value, diffrence);
        }
        return dataChanged;
    }
    static getDifferences(oldValue, newValue) {
        let differences = diff(oldValue, newValue);
        if (Object.keys(differences).length > 0) {
            let changeValue = new changes_1.Changes();
            changeValue.new_value.properties = changeValue.old_value.properties = new Set(Object.keys(differences));
            changeValue.new_value.value = differences;
            changeValue.old_value.value = _.pick(oldValue, Object.keys(differences));
            return changeValue;
        }
        return null;
    }
}
exports.ChangesEvent = ChangesEvent;
//# sourceMappingURL=changes-event.js.map