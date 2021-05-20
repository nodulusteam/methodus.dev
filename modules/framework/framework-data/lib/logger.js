"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogLevel = exports.LogClass = void 0;
const logelas_1 = require("logelas");
var logelas_2 = require("logelas");
Object.defineProperty(exports, "LogClass", { enumerable: true, get: function () { return logelas_2.LogClass; } });
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logelas_2.LogLevel; } });
exports.logger = new logelas_1.Logger('data.log', 'methodus');
//# sourceMappingURL=logger.js.map