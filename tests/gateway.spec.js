"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const alsatian_1 = require("alsatian");
const Gateway_1 = require("./classes/Gateway");
const FirstClass_1 = require("./classes/FirstClass");
const SecondClass_1 = require("./classes/SecondClass");
const ThirdClass_1 = require("./classes/ThirdClass");
const index_1 = require("../index");
const helpers_1 = require("./helpers");
const redis_addr = '//192.168.99.100:32768';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";
const staticResolve = 'http://127.0.0.1:8090';
function wait(timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            }, timeout);
        });
    });
}
let GatewayTest = class GatewayTest {
    // use the async/await pattern in your tests as you would in your code
    testGateway() {
        return __awaiter(this, void 0, void 0, function* () {
            let server, server2, server3, client;
            try {
                server = yield helpers_1.ServerClassHelper('FirstClass', 8091, 'express', index_1.MethodType.Local);
                server2 = yield helpers_1.ServerClassHelper('SecondClass', 8092, 'express', index_1.MethodType.Local);
                server3 = yield helpers_1.ServerClassHelper('ThirdClass', 8093, 'express', index_1.MethodType.Local);
                let config = new index_1.MethodulusConfig();
                config.run(index_1.ServerType.Express, { port: 8080, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
                config.use(Gateway_1.Gateway, index_1.MethodType.Local);
                config.use(FirstClass_1.FirstClass, index_1.MethodType.Http, 'http://127.0.0.1:8091');
                config.use(SecondClass_1.SecondClass, index_1.MethodType.Http, 'http://127.0.0.1:8092');
                config.use(ThirdClass_1.ThirdClass, index_1.MethodType.Http, 'http://127.0.0.1:8093');
                //MethodulusConfig.config[classType.name] = methodType;
                //MethodulusConfig.servers = servers;
                let client = yield new index_1.Server(8080).configure(config).start();
                yield wait(5 * 1000);
                let gw = new Gateway_1.Gateway();
                try {
                    let result1 = yield gw.callFirstClass();
                    alsatian_1.Expect(result1.result.add).toBe('added');
                }
                catch (err) {
                    console.log('call error', err);
                }
                try {
                    let result2 = yield gw.callSecondClass();
                    alsatian_1.Expect(result2.result.add).toBe('added');
                }
                catch (err) {
                    console.log('call error', err);
                }
                try {
                    let result3 = yield gw.callThirdClass();
                    alsatian_1.Expect(result3.result.add).toBe('added');
                }
                catch (err) {
                    console.log('call error', err);
                }
            }
            catch (error) {
                console.log('got error', error);
            }
            finally {
                yield wait(5 * 1000);
                if (server)
                    server.kill();
                if (server2)
                    server2.kill();
                if (server3)
                    server3.kill();
                if (client)
                    client.kill();
            }
        });
    }
};
__decorate([
    alsatian_1.AsyncTest("a triple way gateway")
    // @TestCase(ServerType.Express, MethodType.Http)
    // //  @TestCase(ServerType.RabbitMQ, MethodType.MQ)
    // @TestCase(ServerType.Socket, MethodType.Socket)
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    ,
    alsatian_1.Timeout(50000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayTest.prototype, "testGateway", null);
GatewayTest = __decorate([
    alsatian_1.TestFixture("Test a gateway configuration")
], GatewayTest);
exports.GatewayTest = GatewayTest;
//# sourceMappingURL=gateway.spec.js.map