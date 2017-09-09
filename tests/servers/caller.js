"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const redis_addr = '//192.168.99.100:32768';
const index_1 = require("../../index");
let serverType = process.env.servers.split(',')[0];
let methodType = process.env.servers.MethodType;
let SetupServer = class SetupServer extends index_1.ConfiguredServer {
};
SetupServer = __decorate([
    index_1.ServerConfig(serverType, { 'source': 'caller', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' }),
    index_1.ClientConfig(TestClass_1.TestClass, methodType, 'http://127.0.0.1:8090')
], SetupServer);
class Activator {
    static callAction() {
        return __awaiter(this, void 0, void 0, function* () {
            let myClass = new TestClass_1.TestClass();
            try {
                let result = yield myClass.action1(1, 'roi');
                return result;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new SetupServer();
        let result = yield Activator.callAction();
        console.log(result);
    });
}
init();
//# sourceMappingURL=caller.js.map