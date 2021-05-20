"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weight = void 0;
const decorator_helper_1 = require("./decorator_helper");
/** the IsoDate decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
function Weight(value) {
    return decorator_helper_1.getDecoratorByType({
        type: 'weight',
        param: 'weight',
        value: value
    });
}
exports.Weight = Weight;
//# sourceMappingURL=weight.js.map