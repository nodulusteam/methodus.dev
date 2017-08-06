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

const staticResolve = 'http://localhost:8090';
async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}


describe('initiate modes', function () {
    it('starting express server', async (done) => {
        //run the servers
        let server, client;

        try {
            server = await ServerHelper(8090, 'express', MethodType.Local);
            client = await ClientHelper(TestClass, 8080, ['express'], MethodType.Http, staticResolve);
            await wait(5 * 1000)
            let result = await CallHelper();


            expect(result.add).to.equal('added');
        } catch (error) {
            console.log('got error', error);
        } finally {



        }
        await wait(5 * 1000)
        if (server)
            server.kill();
        if (client)
            client.kill();

        done();

    });

    xit('starting socketio server', async (done) => {
        let server, client;


        try {
            server = await ServerHelper(8090, 'socketio', MethodType.Local);

            //run the client
            client = await ClientHelper(TestClass, 8080, ['socketio'], MethodType.Socket, staticResolve);
            await wait(5 * 1000)
            let result = await CallHelper();
            if (result)
                expect(result.add).to.equal('added');
        } catch (error) {
            console.log(error);
        } finally {
            await wait(5 * 1000)
            if (server)
                server.kill();
            if (client)
                client.kill();

            done();

        }





    });

    xit('starting redis server', async (done) => {
        let server, client;
        try {
            server = await ServerHelper(8090, 'redis', MethodType.Local);
            //run the client
            client = await ClientHelper(TestClass, 8080, ['redis'], MethodType.Redis, staticResolve);
            await wait(5 * 1000)
            let result = await CallHelper();
            if (result)
                expect(result.add).to.equal('added');
        } catch (error) {
            console.log(error);
        } finally {
            await wait(5 * 1000)
            if (server)
                server.kill();
            if (client)
                client.kill();


            done();

        }




    });

    xit('starting [amqp] server', async (done) => {
        let server, client;
        try {
            server = await ServerHelper(8090, 'amqp', MethodType.Local);
            //run the client
            client = await ClientHelper(TestClass, 8080, ['amqp'], MethodType.MQ, staticResolve);
            await wait(5 * 1000)
            let result = await CallHelper();
            expect(result.add).to.equal('added');
        } catch (error) {

        } finally {
            await wait(5 * 1000)
            if (Server)
                server.kill();
            if (client)
                client.kill();
        }





        done();
    });
});
