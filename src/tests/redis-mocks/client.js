"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let callback;
let globalcorr;
class Client {
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
//# sourceMappingURL=client.js.map