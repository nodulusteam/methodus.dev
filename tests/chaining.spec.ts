// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { TestClass } from './classes/test-class';
import { Server, MethodulusConfig,MethodType } from '../index';
import { ServerHelper, ClientHelper, CallHelper } from './helpers'
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";

const staticResolve = 'http://localhost:8090';



describe('initiate 3 server modes', function () {
    // it('starting express server', async (done) => {
    //     //run the servers
    //     let server1 = ServerHelper(8090, 'express', MethodType.Local);
    //     let server2 = ServerHelper(8091, 'express', MethodType.Local);

    //     //run the client
    //     let client = ClientHelper(TestClass, 8080, ['express'], MethodType.Http,staticResolve);
    //     let result = await CallHelper();


    //     server2.kill();
    //     client.kill();

    //     expect(result.add).to.equal('added');
    //     this.timeout(2000);
    //     done();


    // });

    // it('starting socketio server', async (done) => {
    //     let server = ServerHelper(8090, 'socketio', MethodType.Local);

    //     //run the client
    //     let client = ClientHelper(TestClass, 8080, ['socketio'], MethodType.Socket,staticResolve);

    //     let result = await CallHelper();

    //     server.kill();
    //     client.kill();

    //     expect(result.add).to.equal('added');
    //     this.timeout(2000);
    //     done();

    // });

    // it('starting [express,socketio] server', async (done) => {
    //     let server = ServerHelper(8090, 'express,socketio', MethodType.Local);
    //     //run the client
    //     let client = ClientHelper(TestClass, 8080, ['express', 'socketio'], MethodType.Socket,staticResolve);
    //     let result = await CallHelper();
    //     server.kill();
    //     client.kill();
    //     expect(result.add).to.equal('added');
    //     this.timeout(2000);
    //     done();
    // });



});
