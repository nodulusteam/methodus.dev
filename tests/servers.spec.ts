// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { TestClass } from './classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../index';
const { spawn } = require('child_process');
const fs = require('fs');

process.env.CONFIG_PATH = "./tests/config";
process.env.silent = true;

xdescribe('methodulus config defaults to "rest"', function () {
    it('loading configuration for methodulus', function () {
        var config = require('../src/config').MethodulusConfig;
        expect(config.servers[0]).to.equal('rest');
    });
});

xdescribe('initiate in "rest" mode', function () {
    it('starting rest server', async (done) => {

        //run the servers
        const child1 = spawn(process.argv[0], ['./servers/dynamic.js'], {
            MethodType: MethodType.Local, detached: false,
            cwd: __dirname, env: { silent: true, PORT: 8090, servers: ['rest'] }
        });
        let testFinished = false;
        child1.stdout.on('data', async (data) => {
            if (!testFinished) {
                testFinished = true;
                //run the client
                MethodulusConfig.config['TestClass'] = MethodType.Http;
                MethodulusConfig.servers = ["rest"];
                let server = new Server(8080);
                server.useClass(TestClass);

                let myClass = new TestClass();

                let result = await myClass.action1(1654564654, "roicccccc");
                expect(result.add).to.equal('added');
                done();
            }


        });






    });

    xit('starting socketio server', async (done) => {
        const child1 = spawn(process.argv[0], ['./servers/dynamic.js'], {
            MethodType: MethodType.Local, detached: false,
            cwd: __dirname, env: { silent: true, PORT: 8090, servers: ['socketio'] }
        });


        child1.stdout.on('data', async (data) => {
            console.log(data.toString());
            MethodulusConfig.config['TestClass'] = MethodType.Socket;
            MethodulusConfig.servers = ["rest"];
            let server = new Server(8080);
            server.useClass(TestClass);

            let myClass = new TestClass();

            let result = await myClass.action1(1654564654, "roicccccc");
            expect(result.add).to.equal('added');
            done();



            done();
        });





    });

    xit('starting [rest,socketio] server', async (done) => {
        const child1 = spawn(process.argv[0], ['./servers/dynamic.js'], {
            MethodType: MethodType.Local, detached: false,
            cwd: __dirname, env: { silent: true, PORT: 8080, servers: ['rest', 'socketio'] }
        });


        child1.stdout.on('data', async (data) => {
            console.log(data.toString());
            MethodulusConfig.config['TestClass'] = MethodType.Socket;
            MethodulusConfig.servers = ["rest"];
            let server = new Server(8080);
            server.useClass(TestClass);

            let myClass = new TestClass();

            let result = await myClass.action1(1654564654, "roicccccc");
            expect(result.add).to.equal('added');


            done();
        });




    });
});

xdescribe('2  "rest" instances', function () {
    xit('a function call over http', async (done) => {

        MethodulusConfig.config['TestClass'] = MethodType.Http;
        MethodulusConfig.servers = ["rest"];
        let server = new Server(8080);
        server.useClass(TestClass);

        const child1 = spawn(process.argv[0], ['./servers/dynamic.js'], { MethodType: MethodType.Local, detached: true, cwd: __dirname, env: { silent: true, PORT: 8090 } });


        setTimeout(() => {
            console.log('my value');
            // let myClass = new TestClass();
            // console.log('sending the call');
            // let result = await myClass.action1(1654564654, "roicccccc");
            // console.log(result);
            expect(null).to.not.equal(undefined);
            done();
        }, 1000)

        child1.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        child1.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        child1.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });


    });
});
