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
process.env.test = true;
const TestClass_1 = require("../classes/TestClass");
const events_class_1 = require("../classes/events-class");
const index_1 = require("../../index");
const redis_addr = '//192.168.99.100:32768';
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let config = new index_1.MethodulusConfig();
        if (process.env.servers) {
            process.env.servers.split(',').map(server => {
                config.run(server, { 'source': 'caller', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
            });
        }
        config.use(events_class_1.EventsClass, index_1.MethodType.MQ, 'http://127.0.0.1:8090');
        config.use(TestClass_1.TestClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
        let server = yield new index_1.Server(process.env.PORT).configure(config).start();
        //setInterval(async () => {
        let myClass = new TestClass_1.TestClass();
        try {
            console.log('calling action1 on testclass...');
            let result = yield myClass.action1(1, 'roi');
            console.log('result of call is:  ', result);
            // let result = await myClass.error();
            return result;
        }
        catch (error) {
            return Promise.resolve(error);
        }
        //  }, 1000)
    });
}
init().then((result) => {
    console.log(result);
});
//# sourceMappingURL=caller.js.map