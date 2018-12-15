"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
class Redis {
    createClient() {
        return new client_1.Client();
    }
}
const redis = new Redis();
module.exports = redis;
//# sourceMappingURL=index.js.map