// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { TestClass } from './classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../index';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";
process.env.silent = true;

describe('methodulus config defaults to "rest"', function () {
    it('loading configuration for methodulus', function () {
        var config = require('../src/config').MethodulusConfig;
        expect(config.servers[0]).to.equal('rest');
    });
});


function ServerHelper(port, servers, methodType: MethodType) {
    const child1 = childProcessDebug.spawn(process.argv[0], ['./tests/servers/dynamic.js'], {
        detached: true,
        cwd: path.resolve('./'), env: { silent: true, PORT: port, servers: servers, MethodType: methodType }
    });
    child1.stdout.on('data', async (data) => {
        console.error(`child stddata:\n${data}`);
    });
    child1.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    child1.on('exit', function (code, signal) {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`);
    });
    return child1;
}

function ClientHelper(classType, port, servers, methodType: MethodType) {
    MethodulusConfig.config[classType.name] = methodType;
    MethodulusConfig.servers = servers;
    let server = new Server(port);
    server.useClass(classType);
    return server;
}


async function CallHelper(): Promise<any> {
    let myClass = new TestClass();
    let result = await myClass.action1(1654564654, "roicccccc");
    return result;
}
describe('initiate in "rest" mode', function () {
    it('starting rest server', async (done) => {
        //run the servers

        let server = ServerHelper(8090, 'rest', MethodType.Local);

        //run the client
        let client = ClientHelper(TestClass, 8080, ['rest'], MethodType.Http);
        let result = await CallHelper();


        server.kill();
        client.kill();
        console.log('test result', result);
        expect(result.add).to.equal('added');
        this.timeout(2000);
        done();


    });

    it('starting socketio server', async (done) => {
        let server = ServerHelper(8090, 'socketio', MethodType.Local);

        //run the client
        let client = ClientHelper(TestClass, 8080, ['socketio'], MethodType.Socket);

        let result = await CallHelper();
        console.log('test result', result);
        server.kill();
        client.kill();
        console.log('test result', result);
        expect(result.add).to.equal('added');
        this.timeout(2000);
        done();

    });

    it('starting [rest,socketio] server', async (done) => {
        let server = ServerHelper(8090, 'rest,socketio', MethodType.Local);
        //run the client
        let client = ClientHelper(TestClass, 8080, ['rest', 'socketio'], MethodType.Socket);
        let result = await CallHelper();
        server.kill();
        client.kill();
        expect(result.add).to.equal('added');
        this.timeout(2000);
        done();
    });
});
