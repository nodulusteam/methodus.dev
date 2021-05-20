"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const _Validator = require("class-validator");
async function validate(item) {
    const result = await _Validator.validate(item);
    if (result.length > 0) {
        return result;
    }
    return false;
}
exports.validate = validate;
//# sourceMappingURL=validator.js.map