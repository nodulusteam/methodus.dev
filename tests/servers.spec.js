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
const helpers_1 = require("./helpers");
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";
index_1.logger.truncate();
let Servers = class Servers {
    // use the async/await pattern in your tests as you would in your code
    serverTest(serverType, methodType) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                console.log(`testing ${serverType}`);
                let ports = helpers_1.PortHelper();
                const staticResolve = 'http://127.0.0.1:' + ports.server;
                helpers_1.ServerHelper(ports.server, serverType, index_1.MethodType.Local).then(server => {
                    wait(1000 * 10).then(() => {
                        helpers_1.ClientHelper(TestClass_1.TestClass, ports.client, [serverType], methodType, staticResolve).then(client => {
                            helpers_1.CallHelper().then(methodResult => {
                                if (server)
                                    server.kill();
                                if (client)
                                    client.kill();
                                console.log(methodResult.result);
                                alsatian_1.Expect(methodResult.result.add).toEqual('added');
                                resolve();
                            }).catch((error) => {
                                console.log(error);
                            });
                        });
                    });
                });
            }));
        });
    }
    singlePeerCallerTest(serverType, methodType) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                process.env.test = true;
                console.log(`testing ${serverType}`);
                let ports = helpers_1.PortHelper();
                const staticResolve = 'http://127.0.0.1:' + ports.server;
                helpers_1.ClientHelper(TestClass_1.TestClass, ports.client, [serverType], methodType, staticResolve).then(client => {
                    helpers_1.CallHelper().then(methodResult => {
                        if (client)
                            client.kill();
                        console.log(methodResult.result);
                        alsatian_1.Expect(methodResult).toBeDefined();
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                    });
                });
            }));
        });
    }
};
__decorate([
    alsatian_1.AsyncTest('asychronous test'),
    alsatian_1.TestCase(index_1.ServerType.Express, index_1.MethodType.Http)
    //@TestCase(ServerType.RabbitMQ, MethodType.MQ)
    ,
    alsatian_1.TestCase(index_1.ServerType.Socket, index_1.MethodType.Socket)
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    ,
    alsatian_1.Timeout(50000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Servers.prototype, "serverTest", null);
__decorate([
    alsatian_1.AsyncTest('single peer caller test'),
    alsatian_1.TestCase(index_1.ServerType.RabbitMQ, index_1.MethodType.MQ),
    alsatian_1.TestCase(index_1.ServerType.Redis, index_1.MethodType.Redis)
    //@TestCase(ServerType.Kafka, MethodType.Kafka)
    ,
    alsatian_1.Timeout(50000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Servers.prototype, "singlePeerCallerTest", null);
Servers = __decorate([
    alsatian_1.TestFixture('Test all servers RPC')
], Servers);
exports.Servers = Servers;
function wait(timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            }, timeout);
        });
    });
}
//# sourceMappingURL=servers.spec.js.map