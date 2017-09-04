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
const FirstClass_1 = require("../../classes/FirstClass");
const SecondClass_1 = require("../../classes/SecondClass");
const ThirdClass_1 = require("../../classes/ThirdClass");
const index_1 = require("../../../index");
let config = new index_1.MethodulusConfig();
const redis_addr = '//192.168.99.100:32768';
if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
    });
}
config.use(FirstClass_1.FirstClass, process.env.METHODTYPE, 'http://127.0.0.1:8091');
config.use(SecondClass_1.SecondClass, process.env.METHODTYPE, 'http://127.0.0.1:8091');
config.use(ThirdClass_1.ThirdClass, process.env.METHODTYPE, 'http://127.0.0.1:8091');
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = yield new index_1.Server(process.env.PORT).configure(config).start();
    });
}
init();
//# sourceMappingURL=FirstClass.js.map