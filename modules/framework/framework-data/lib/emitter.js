"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDataEmitter = exports.DataEmitter = void 0;
const events_1 = require("events");
class DataEmitter extends events_1.EventEmitter {
    changes(topic, changeData) {
        this.emit(topic, changeData);
    }
}
exports.DataEmitter = DataEmitter;
exports.EventDataEmitter = new DataEmitter();
//# sourceMappingURL=emitter.js.map