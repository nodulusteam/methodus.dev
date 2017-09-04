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
const TestClass_1 = require("./classes/TestClass");
const index_1 = require("../index");
const _1 = require("./helpers/");
const staticResolve = 'http://127.0.0.1:8090';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
let Responses = class Responses {
    // use the async/await pattern in your tests as you would in your code
    responseTest(serverType, methodType) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let ports = _1.PortHelper();
                const staticResolve = 'http://127.0.0.1:' + ports.server;
                _1.ServerHelper(ports.server, serverType, index_1.MethodType.Local).then(server => {
                    wait(1000 * 5).then(() => {
                        _1.ClientHelper(TestClass_1.TestClass, ports.client, [serverType], methodType, staticResolve).then((client) => __awaiter(this, void 0, void 0, function* () {
                            let myClass = new TestClass_1.TestClass();
                            try {
                                let result = yield myClass.error();
                            }
                            catch (error) {
                                alsatian_1.Expect(error.error).toBeDefined();
                            }
                            finally {
                            }
                            if (server)
                                server.kill();
                            if (client)
                                client.kill();
                            resolve();
                        }));
                    });
                });
            }));
        });
    }
};
__decorate([
    alsatian_1.AsyncTest("Test error response"),
    alsatian_1.TestCase(index_1.ServerType.Express, index_1.MethodType.Http),
    alsatian_1.TestCase(index_1.ServerType.RabbitMQ, index_1.MethodType.MQ),
    alsatian_1.TestCase(index_1.ServerType.Socket, index_1.MethodType.Socket)
    //@TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    ,
    alsatian_1.Timeout(50000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Responses.prototype, "responseTest", null);
Responses = __decorate([
    alsatian_1.TestFixture("Test all responses for all servers")
], Responses);
exports.Responses = Responses;
function wait(timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            }, timeout);
        });
    });
}
//# sourceMappingURL=response.spec.js.map