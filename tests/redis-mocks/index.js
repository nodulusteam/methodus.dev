"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection = require("./connection");
let connections = {};
class Redis {
    createClient() {
        return new Client();
    }
    ;
}
let callback;
let globalcorr;
const redis = new Redis();
class Client {
    constructor() {
    }
    subscribe(corr) {
        globalcorr = corr;
    }
    on(eventname, cb) {
        callback = cb;
    }
    publish(channel, msg) {
        callback(globalcorr, msg);
    }
}
exports.Client = Client;
module.exports = redis;
//# sourceMappingURL=index.js.map