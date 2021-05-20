"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = void 0;
const decorator_helper_1 = require("./decorator_helper");
/** the ObjectId decorator registers the model with the odm
 *  @param {string} name - the name of the db (mongo) collection.
 */
function ObjectId(name) {
    return decorator_helper_1.getDecoratorByType({
        type: 'identifier',
        param: 'objectid'
    });
}
exports.ObjectId = ObjectId;
//# sourceMappingURL=objectid.js.map