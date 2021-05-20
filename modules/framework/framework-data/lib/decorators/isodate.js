"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsoDate = void 0;
const decorator_helper_1 = require("./decorator_helper");
/** the IsoDate decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
function IsoDate(name) {
    return decorator_helper_1.getDecoratorByType({
        type: 'date',
        param: 'isodate'
    });
}
exports.IsoDate = IsoDate;
//# sourceMappingURL=isodate.js.map