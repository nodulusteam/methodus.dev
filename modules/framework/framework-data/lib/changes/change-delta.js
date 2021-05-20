"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDelta = void 0;
class ChangeDelta {
    constructor() {
        this.property = new Array();
        this.value = new Object();
    }
    //This is a workaround because JSON.stringify is not working for Set Type
    get properties() {
        return new Set(this.property);
    }
    set properties(values) {
        this.property = Array.from(values);
    }
}
exports.ChangeDelta = ChangeDelta;
//# sourceMappingURL=change-delta.js.map