// tests/config.js

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { TestClass } from './classes/test-class';
import { Server, MethodulusConfig, MethodType } from '../index';
import { ServerHelper, ClientHelper, CallHelper, PortHelper } from './helpers'




const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";


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
            let ports = PortHelper();
            const staticResolve = 'http://localhost:' + ports.server;
            server = await ServerHelper(ports.server, 'express', MethodType.Local);
            client = await ClientHelper(TestClass, ports.client, ['express'], MethodType.Http, staticResolve);
            await wait(5 * 1000)
            let methodResult = await CallHelper();


            expect(methodResult.result.add).to.equal('added');
        } catch (error) {
            console.log('got error', error);
        } finally {



        }
        console.log('go done');
        if (server)
            server.kill();
        console.log('go done');
        if (client)
            client.kill();

        console.log('go done');
        done();

    });

    xit('starting socketio server', async (done) => {
        let server, client;


        try {
            let ports = PortHelper();
            const staticResolve = 'http://localhost:' + ports.server;
            server = await ServerHelper(ports.server, 'socketio', MethodType.Local);

            //run the client
            client = await ClientHelper(TestClass, ports.client, ['socketio'], MethodType.Socket, staticResolve);
            await wait(5 * 1000)
            let methodResult = await CallHelper();
            if (methodResult)
                expect(methodResult.result.add).to.equal('added');


        } catch (error) {
            console.log(error);
        } finally {

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
            let ports = PortHelper();
            const staticResolve = 'http://localhost:' + ports.server;
            server = await ServerHelper(ports.server, 'redis', MethodType.Local);
            //run the client
            client = await ClientHelper(TestClass, ports.client, ['redis'], MethodType.Redis, staticResolve);
            await wait(5 * 1000)
            let methodResult = await CallHelper();
            if (methodResult)
                expect(methodResult.result.add).to.equal('added');
        } catch (error) {
            console.log(error);
        } finally {

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
            let ports = PortHelper();
            const staticResolve = 'http://localhost:' + ports.server;
            server = await ServerHelper(ports.server, 'amqp', MethodType.Local);
            //run the client
            client = await ClientHelper(TestClass, ports.client, ['amqp'], MethodType.MQ, staticResolve);
            await wait(5 * 1000)
            let methodResult = await CallHelper();
            expect(methodResult.result.add).to.equal('added');
        } catch (error) {

        } finally {

            if (Server)
                server.kill();
            if (client)
                client.kill();
        }





        done();
    });
});
