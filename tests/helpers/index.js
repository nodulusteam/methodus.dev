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
const TestClass_1 = require("../classes/TestClass");
const index_1 = require("../../index");
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
// process.env.CONFIG_PATH = "./tests/config";
// 
const redis_addr = '//192.168.99.100:32768';
const ports = [];
for (let i = 0; i < 100; i++) {
    ports.push({ server: 8200 + i, client: 9200 + i });
}
let portsCounter = 0;
function PortHelper() {
    return ports[portsCounter++];
}
exports.PortHelper = PortHelper;
function ServerHelper(port, servers, methodType) {
    return __awaiter(this, void 0, void 0, function* () {
        const child1 = childProcessDebug.spawn(process.argv[0], ['./tests/servers/dynamic.js'], {
            detached: false,
            cwd: path.resolve('./'),
            execArgv: ['--debug-brk=6001'],
            env: { PORT: port, servers: servers, MethodType: methodType, logName: 'server' }
        });
        child1.stdout.on('data', (data) => __awaiter(this, void 0, void 0, function* () {
            console.error(`child stddata:\n${data}`);
        }));
        child1.stderr.on('data', (data) => {
            index_1.logger.error(`child stderr:\n${data}`);
        });
        child1.on('uncaughtException', function (code, signal) {
            console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
        });
        child1.on('SIGTERM', function (code, signal) {
            console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
        });
        child1.on('exit', function (code, signal) {
            console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
        });
        return child1;
    });
}
exports.ServerHelper = ServerHelper;
function ServerClassHelper(name, port, servers, methodType) {
    return __awaiter(this, void 0, void 0, function* () {
        const child1 = childProcessDebug.spawn(process.argv[0], ['./tests/servers/perclass/' + name + '.js'], {
            detached: true,
            cwd: path.resolve('./'), env: { PORT: port, servers: servers, MethodType: methodType, logName: 'server' }
        });
        child1.stdout.on('data', (data) => __awaiter(this, void 0, void 0, function* () {
            // console.error(`child stddata:\n${data}`);
        }));
        child1.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
        });
        child1.on('exit', function (code, signal) {
            // console.log('child process exited with ' +
            //   `code ${code} and signal ${signal}`);
        });
        return child1;
    });
}
exports.ServerClassHelper = ServerClassHelper;
function ClientHelper(classType, port, servers, methodType, resolver) {
    return __awaiter(this, void 0, void 0, function* () {
        process.env.logName = 'client';
        let config = new index_1.MethodulusConfig(servers);
        if (servers) {
            servers.map(server => {
                config.run(server, { port: port, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
            });
        }
        config.use(classType, methodType, resolver);
        //MethodulusConfig.config[classType.name] = methodType;
        //MethodulusConfig.servers = servers;
        let server = yield new index_1.Server(port).configure(config).start();
        return server;
    });
}
exports.ClientHelper = ClientHelper;
function CallHelper() {
    return __awaiter(this, void 0, void 0, function* () {
        let myClass = new TestClass_1.TestClass();
        try {
            let value = yield myClass.action1(1654564654, "roicccccc");
            return value;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.CallHelper = CallHelper;
function EventHelper() {
    return __awaiter(this, void 0, void 0, function* () {
        let methodEvent = yield new index_1.MethodEvent('FirstClassEvent', 'asdasdads');
        return methodEvent;
    });
}
exports.EventHelper = EventHelper;
//# sourceMappingURL=index.js.map