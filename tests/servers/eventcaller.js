"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gateway_1 = require("../classes/Gateway");
const FirstClass_1 = require("../classes/FirstClass");
const index_1 = require("../../index");
const redis_addr = '//192.168.99.100:32768';
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let config = new index_1.MethodulusConfig();
        if (process.env.servers) {
            process.env.servers.split(',').map(server => {
                config.run(server, { 'source': 'eventcaller', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
            });
        }
        config.use(Gateway_1.Gateway, index_1.MethodType.Local);
        config.use(FirstClass_1.FirstClass, index_1.MethodType.Http, 'http://127.0.0.1:8091');
        const server = yield new index_1.Server(process.env.PORT).configure(config).start();
        let myClass = new Gateway_1.Gateway();
        try {
            let result = yield myClass.callFirstClass();
            return result;
        }
        catch (error) {
            return Promise.resolve(error);
        }
    });
}
init().then((result) => {
    console.log(result);
});
//# sourceMappingURL=eventcaller.js.map