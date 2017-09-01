import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { TestClass } from './classes/TestClass';
import { logger, Server, ServerType, MethodulusConfig, MethodType } from '../index';
import { ServerHelper, ClientHelper, CallHelper, PortHelper } from './helpers'

const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";

logger.truncate();




@TestFixture('Test all servers RPC')
export class Servers {

    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('asychronous test')
    @TestCase(ServerType.Express, MethodType.Http)
    //@TestCase(ServerType.RabbitMQ, MethodType.MQ)
    @TestCase(ServerType.Socket, MethodType.Socket)
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async serverTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {

            console.log(`testing ${serverType}`);
            let ports = PortHelper();
            const staticResolve = 'http://127.0.0.1:' + ports.server;
            ServerHelper(ports.server, serverType, MethodType.Local).then(server => {
                wait(1000 * 10).then(() => {
                    ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then(client => {
                        CallHelper().then(methodResult => {
                            if (server)
                                server.kill();

                            if (client)
                                client.kill();
                            console.log(methodResult.result);
                            Expect(methodResult.result.add).toEqual('added');
                            resolve();
                        }).catch((error) => {
                            console.log(error);
                        });
                    })
                })
            });
        });
    }



    @AsyncTest('single peer caller test')
    @TestCase(ServerType.RabbitMQ, MethodType.MQ)
    @TestCase(ServerType.Redis, MethodType.Redis)
    //@TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async singlePeerCallerTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {
            process.env.test = true;
            console.log(`testing ${serverType}`);
            let ports = PortHelper();
            const staticResolve = 'http://127.0.0.1:' + ports.server;

            ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then(client => {
                CallHelper().then(methodResult => {
                    if (client)
                        client.kill();
                    console.log(methodResult.result);
                    Expect(methodResult).toBeDefined();
                    resolve();
                }).catch((error) => {
                    console.log(error);
                });
            })
        })
    }

}


async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}
