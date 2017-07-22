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


describe('test method messages MetodError, MethodResult', function () {
    it('error statusCode on REST', async (done) => {
        //run the servers

        let server = ServerHelper(8090, 'rest', MethodType.Local);

        //run the client
        let client = ClientHelper(TestClass, 8080, ['rest'], MethodType.Http,staticResolve);
        let myClass = new TestClass();
        try {
            let result = await myClass.error();
            expect(result).to.equal('error returned');
        } catch (error) {
            expect(error.error).to.equal('error returned');
        } finally {

            server.kill();
            client.kill();

            this.timeout(2000);
            done();

        }




    });

    it('error statusCode on SOCKET', async (done) => {
        let server = ServerHelper(8090, 'socketio', MethodType.Local);

        //run the client
        let client = ClientHelper(TestClass, 8080, ['socketio'], MethodType.Socket,staticResolve);
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
            this.timeout(2000);
            done();
        }

    });

    it('starting [rest,socketio] server', async (done) => {
        let server = ServerHelper(8090, 'socketio', MethodType.Local);

        //run the client
        let client = ClientHelper(TestClass, 8080, ['socketio'], MethodType.Socket,staticResolve);
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
            this.timeout(2000);
            done();
        }



    });



});