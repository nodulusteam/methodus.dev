"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Number = void 0;
const decorator_helper_1 = require("./decorator_helper");
/** the IsoDate decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
function Number(value, mongoType) {
    return decorator_helper_1.getDecoratorByType({
        type: mongoType || 'number',
        param: 'number',
        value: value
    });
}
exports.Number = Number;
//# sourceMappingURL=number.js.map