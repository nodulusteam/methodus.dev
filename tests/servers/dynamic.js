"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_class_1 = require("../classes/events-class");
const TestClass_1 = require("../classes/TestClass");
const index_1 = require("../../index");
// import {  Server, MethodType, MethodulusConfig } from '../../index';
// process.env.test=true;
// let config = new MethodulusConfig();
// const redis_addr = '//192.168.99.100:32768';
let server = process.env.servers.split(',')[0];
;
// if (process.env.servers) {
//     process.env.servers.split(',').map(server => {
//         config.run(server, { 'source': 'dynamic', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
//     })
// }
// async function init() {
//     config.use(EventsClass, MethodType.Local, 'http://127.0.0.1:8090');
//     config.use(TestClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
//    // config.use(FirstClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
//     await new Server(process.env.PORT).configure(config).start();
// }
// init();
let SetupServer = class SetupServer extends index_1.ConfiguredServer {
};
SetupServer = __decorate([
    index_1.ServerConfig(server, { port: process.env.PORT || 8020 }),
    index_1.ClientConfig(TestClass_1.TestClass, index_1.MethodType.Local),
    index_1.ClientConfig(events_class_1.EventsClass, index_1.MethodType.Local)
], SetupServer);
let s = new SetupServer();
//# sourceMappingURL=dynamic.js.map