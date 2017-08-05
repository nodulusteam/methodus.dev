// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { TestClass } from './classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../index';
import { ServerHelper, ClientHelper } from './helpers/'
const staticResolve = 'http://localhost:8090';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');

export async function CallHelper(): Promise<any> {
    let myClass = new TestClass();
    let result = await myClass.error();
    return result;
}

async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}


describe('test method messages MetodError, MethodResult', function () {
    it('error statusCode on REST', async function (done) {
        //run the servers
        //  console.log('REST ---------------------------------------------------------------------------------');
        let server = ServerHelper(8090, 'express', MethodType.Local);
        await wait(5 * 1000);
        //run the client
        let client = await ClientHelper(TestClass, 8080, ['express'], MethodType.Http, staticResolve);

        let myClass = new TestClass();

        try {
            let result: any = await myClass.error();//myClass.action1(1, 'roi');

        }
        catch (error) {

            expect(error.error).to.equal('error returned');

        } finally {



            server.kill();
            client.kill();

            await wait(2 * 1000);
            done();
        }





    });

    it('error statusCode on SOCKET', async (done) => {
        // console.log('SOCKETIO ---------------------------------------------------------------------------------');
        let server = await ServerHelper(8090, 'socketio', MethodType.Local);

        //run the client
        let client = await ClientHelper(TestClass, 8080, ['socketio'], MethodType.Socket, staticResolve);
        await wait(5 * 1000);
        let myClass = new TestClass();
        try {
            let result: any = await myClass.error();//myClass.action1(1, 'roi');

        }
        catch (error) {
            expect(error.error).to.equal('error returned');

        } finally {


            // console.log('test result', result);
            server.kill();
            client.kill();

            //expect(result.statusCode).to.equal(500);
            await wait(2 * 1000);
            done();
        }

    });

    it('starting [redis] server', async (done) => {
        // console.log('REST SOCKETIO ---------------------------------------------------------------------------------');
        let server = await ServerHelper(8090, 'redis', MethodType.Local);

        //run the client
        let client = await ClientHelper(TestClass, 8080, ['redis'], MethodType.Redis, staticResolve);

        await wait(5 * 1000);
        let myClass = new TestClass();
        try {
            let result: any = await myClass.error();//myClass.action1(1, 'roi');
            expect(result.name).to.equal('roi');
        }
        catch (error) {
            expect(error.error).to.equal('error returned');
        } finally {
            // console.log('test result', result);
            server.kill();
            client.kill();

            //expect(result.statusCode).to.equal(500);
            await wait(2 * 1000);
            done();
        }



    });

    it('starting [amqp] server', async (done) => {
        // console.log('REST SOCKETIO ---------------------------------------------------------------------------------');
        let server = await ServerHelper(8090, 'amqp', MethodType.Local);

        //run the client
        let client = await ClientHelper(TestClass, 8080, ['amqp'], MethodType.MQ, staticResolve);

        await wait(5 * 1000);
        let myClass = new TestClass();
        try {
            let result: any = await myClass.error();//myClass.action1(1, 'roi');
            expect(result.name).to.equal('roi');
        }
        catch (error) {
            expect(error.error).to.equal('error returned');
        } finally {
            // console.log('test result', result);
            server.kill();
            client.kill();

            //expect(result.statusCode).to.equal(500);
            await wait(2 * 1000);
            done();
        }



    });

});