process.env.test = 'true';
import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from 'alsatian';
import { MiddleWaresClass,MiddleWaresClass2 } from './classes/MiddleWaresClass';
import { logger, Server, ServerType, MethodusConfig, MethodType } from '../index';
import { Wait, ServerHelper, ClientHelper, CallHelper, PortHelper } from './helpers'


const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = './tests/config';



const request = require('supertest');
const express = require('express');

const app = express();

@TestFixture('Test multiple middlewares')
export class Servers {
    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('asychronous test')
    //@TestCase(ServerType.Express, MethodType.Http)
    @Timeout(50000)
    public async serverTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {


            process.env.silent = false;
            const redis_addr = '//192.168.99.100:32771';
            let config = new MethodusConfig();

            config.run(serverType, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: 'localhost' });
          
            config.use(MiddleWaresClass, MethodType.Local,serverType);
            config.use(MiddleWaresClass2, MethodType.Local,serverType);
            

            const server = new Server(process.env.PORT).configure(config).start();




            // request(app)
            //     .get('/posts/3/roi')
            //     //.expect('Content-Type', /json/)
            //     //.expect('Content-Length', '15')
            //     .expect(200)
            //     .end(function (err, res) {
            //         if (err) throw err;
            //     });


            // let ports = PortHelper();
            // const staticResolve = 'http://127.0.0.1:' + ports.server;
            // ServerHelper(ports.server, serverType, MethodType.Local).then(server => {

            // });
        });
    }

    // pass arguments into your test functions to keep your test code from being repetative
    // @TestCase(2, 2, 4)
    // @TestCase(2, 3, 5)
    // @TestCase(3, 3, 6)
    // @Test('addition tests')
    // public addTest(firstNumber: number, secondNumber: number, expectedSum: number) {
    //     Expect(firstNumber + secondNumber).toBe(expectedSum);
    // }
}








