// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { TestClass } from './classes/test-class';
import { Server, MethodulusConfig, MethodType } from '../index';
import { ServerHelper, ClientHelper, CallHelper } from './helpers'
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";
process.env.silent = true;
const staticResolve = 'http://localhost:8090';
describe('methodulus config defaults to "rest"', function () {
    it('loading configuration for methodulus', function () {
        let config = new MethodulusConfig(['rest']);
        expect(config.servers[0]).to.equal('rest');
    });
});



describe('initiate modes', function () {
    xit('starting rest server', async (done) => {
        //run the servers
        let server = ServerHelper(8090, 'rest', MethodType.Local);

        //run the client
        let client = ClientHelper(TestClass, 8080, ['rest'], MethodType.Http,staticResolve);
        this.timeout(2000);
        let result = await CallHelper();


        server.kill();
        client.kill();

        expect(result.add).to.equal('added');
        this.timeout(2000);
        done();


    });

    it('starting socketio server', async (done) => {
        let server = ServerHelper(8090, 'socketio', MethodType.Local);

        //run the client
        let client = ClientHelper(TestClass, 8080, ['socketio'], MethodType.Socket,staticResolve);

        let result = await CallHelper();

        server.kill();
        client.kill();

        expect(result.add).to.equal('added');
        this.timeout(2000);
        done();

    });

    it('starting [rest,socketio] server', async (done) => {
        let server = ServerHelper(8090, 'rest,socketio', MethodType.Local);
        //run the client
        let client = ClientHelper(TestClass, 8080, ['rest', 'socketio'], MethodType.Socket,staticResolve);
        let result = await CallHelper();
        server.kill();
        client.kill();
        expect(result.add).to.equal('added');
        this.timeout(2000);
        done();
    });



});
