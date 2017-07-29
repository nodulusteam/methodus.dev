// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { Gateway } from './classes/Gateway';
import { FirstClass } from './classes/FirstClass';
import { SecondClass } from './classes/SecondClass';
import { ThirdClass } from './classes/ThirdClass';

import { ServerType, Server, MethodulusConfig, MethodType } from '../index';
import { ServerClassHelper, ServerHelper, ClientHelper, CallHelper } from './helpers'

const redis_addr = '//192.168.99.100:32768';


const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";
process.env.methodulus_name = 'event-caller';
const staticResolve = 'http://localhost:8090';
// describe('methodulus config defaults to "express"', function () {
//     it('loading configuration for methodulus', function () {
//         let config = new MethodulusConfig(['express']);
//         expect(config.servers[0]).to.equal('express');
//     });
// });

describe('initiate modes', function () {
    it('starting express server', async (done) => {
        //run the servers
        let server, server2, server3, client;

        try {
            //server = ServerClassHelper('FirstClass', 8091, 'express', MethodType.Local);
            // server2 = ServerClassHelper('SecondClass', 8092, 'express', MethodType.Local);
            // server3 = ServerClassHelper('ThirdClass', 8093, 'express', MethodType.Local);



            let config = new MethodulusConfig();

            config.run(ServerType.Express, { port: 8080, client: redis_addr, server: redis_addr, amqp: 'localhost' });


            config.use(Gateway, MethodType.Local);
            config.use(FirstClass, MethodType.Http, 'http://localhost:8091');
            // config.use(SecondClass, MethodType.Http, 'http://localhost:8092');
            // config.use(ThirdClass, MethodType.Http, 'http://localhost:8093');

            //MethodulusConfig.config[classType.name] = methodType;
            //MethodulusConfig.servers = servers;
            let client = await new Server(8080).configure(config).start();






            this.timeout(2000);
            let gw = new Gateway();
            let result1: any = await gw.callFirstClass();
            // let result2: any = await gw.callSecondClass();
            // let result3: any = await gw.callThirdClass();

            console.log('got result', result1);

            expect(result1.add).to.equal('added');
        } catch (error) {
            console.log('got error', error);
        } finally {
            if (server)
                server.kill();
            if (server2)
                server2.kill();
            if (server3)
                server3.kill();
            if (client)
                client.kill();



        }
        this.timeout(2000);
        done();
        //run the client







    });

    it('starting redis server', async (done) => {
        //run the servers
        let server, server2, server3, client;

        try {
            server = ServerClassHelper('FirstClass', 8091, 'redis', MethodType.Local);
            //  server2 = ServerClassHelper('SecondClass', 8092, 'redis', MethodType.Local);
            // server3 = ServerClassHelper('ThirdClass', 8093, 'redis', MethodType.Local);



            let config = new MethodulusConfig();

            config.run(ServerType.Redis, { port: 8080, client: redis_addr, server: redis_addr, amqp: 'localhost' });


            config.use(Gateway, MethodType.Local);
            config.use(FirstClass, MethodType.Redis, 'http://localhost:8091');
            // config.use(SecondClass, MethodType.Http, 'http://localhost:8092');
            // config.use(ThirdClass, MethodType.Http, 'http://localhost:8093');

            //MethodulusConfig.config[classType.name] = methodType;
            //MethodulusConfig.servers = servers;
            let client = await new Server(8080).configure(config).start();






            this.timeout(5000);
            let gw = new Gateway();
            let result1: any = await gw.callFirstClass();
            console.log('result1', result1);
            // let result2: any = await gw.callSecondClass();
            // let result3: any = await gw.callThirdClass();



            expect(result1.add).to.equal('added');
        } catch (error) {
            console.log('got error', error);
        } finally {
            if (server)
                server.kill();
            if (server2)
                server2.kill();
            if (server3)
                server3.kill();
            if (client)
                client.kill();



        }
        this.timeout(2000);
        done();
        //run the client







    });

});
