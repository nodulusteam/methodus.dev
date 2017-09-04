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
const events_class_1 = require("../classes/events-class");
const TestClass_1 = require("../classes/TestClass");
const index_1 = require("../../index");
process.env.test = true;
let config = new index_1.MethodulusConfig();
const redis_addr = '//192.168.99.100:32768';
if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, { 'source': 'dynamic', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        config.use(events_class_1.EventsClass, index_1.MethodType.Local, 'http://127.0.0.1:8090');
        config.use(TestClass_1.TestClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
        // config.use(FirstClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
        yield new index_1.Server(process.env.PORT).configure(config).start();
    });
}
init();
//# sourceMappingURL=dynamic.js.map