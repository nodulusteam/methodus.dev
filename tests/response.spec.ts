import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";

import { TestClass } from './classes/TestClass';
import { ServerType, logger, Server, MethodType, MethodulusConfig } from '../index';
import { ServerHelper, PortHelper, ClientHelper } from './helpers/'
const staticResolve = 'http://localhost:8090';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
 


@TestFixture("Test all responses for all servers")
export class Responses {
    // use the async/await pattern in your tests as you would in your code
    @AsyncTest("Test error response")
    @TestCase(ServerType.Express, MethodType.Http)
    //  @TestCase(ServerType.RabbitMQ, MethodType.MQ)
    @TestCase(ServerType.Socket, MethodType.Socket)
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async responseTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {
            let ports = PortHelper();
            const staticResolve = 'http://localhost:' + ports.server;
            ServerHelper(ports.server, serverType, MethodType.Local).then(server => {
                wait(1000 * 10).then(() => {
                    ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then(async (client) => {
                        let myClass = new TestClass();
                        try {
                            let result: any = await myClass.error();
                        } catch (error) {
                            Expect(error.error).toBeDefined();
                        } finally {

                        }
                        if (server)
                            server.kill();

                        if (client)
                            client.kill();
                        resolve();

                    })
                })
            });
        });
    }


}

async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}