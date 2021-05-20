"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryUtility = void 0;
const _ = require("lodash");
class QueryUtility {
    static convertObjectForUpdate(dataToUpdate) {
        const groupedByDollar = _.groupBy(_.map(dataToUpdate, (value, key) => {
            return { [key]: value };
        }), (obj) => {
            return Object.keys(obj)[0][0] === '$';
        });
        let convertedObject = {
            $set: new Object()
        };
        if (groupedByDollar.false) {
            groupedByDollar.false.forEach(nonDollarObject => Object.assign(convertedObject.$set, nonDollarObject));
        }
        if (groupedByDollar.true) {
            groupedByDollar.true.forEach(dollarObject => Object.assign(convertedObject, dollarObject));
        }
        return convertedObject;
    }
}
exports.QueryUtility = QueryUtility;
//# sourceMappingURL=utility.js.map