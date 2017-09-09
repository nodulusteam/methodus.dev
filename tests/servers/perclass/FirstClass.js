"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirstClass_1 = require("../../classes/FirstClass");
const SecondClass_1 = require("../../classes/SecondClass");
const ThirdClass_1 = require("../../classes/ThirdClass");
const index_1 = require("../../../index");
process.env.test = true;
const redis_addr = '//192.168.99.100:32768';
let server = process.env.servers.split(',')[0];
let SetupServer = class SetupServer extends index_1.ConfiguredServer {
};
SetupServer = __decorate([
    index_1.ServerConfig(server, { 'source': 'dynamic', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' }),
    index_1.ClientConfig(FirstClass_1.FirstClass, process.env.METHODTYPE, 'http://127.0.0.1:8091'),
    index_1.ClientConfig(SecondClass_1.SecondClass, process.env.METHODTYPE, 'http://127.0.0.1:8091'),
    index_1.ClientConfig(ThirdClass_1.ThirdClass, process.env.METHODTYPE, 'http://127.0.0.1:8091')
], SetupServer);
new SetupServer();
//# sourceMappingURL=FirstClass.js.map