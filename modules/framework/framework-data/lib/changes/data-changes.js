"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataChange = void 0;
const _1 = require("./");
class DataChange {
    constructor(context) {
        this.value = new _1.Changes();
        if (context) {
            this.context = context;
        }
    }
}
exports.DataChange = DataChange;
//# sourceMappingURL=data-changes.js.map