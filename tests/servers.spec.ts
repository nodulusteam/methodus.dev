import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { TestClass } from './classes/TestClass';
import { logger, Server, ServerType, MethodulusConfig, MethodType } from '../index';
import { ServerHelper, ClientHelper, CallHelper, PortHelper } from './helpers'

const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";





@TestFixture("Test all servers RPC")
export class Servers {

    // use the async/await pattern in your tests as you would in your code
    @AsyncTest("asychronous test")
    @TestCase(ServerType.Express, MethodType.Http)
    //@TestCase(ServerType.RabbitMQ, MethodType.MQ)
    @TestCase(ServerType.Socket, MethodType.Socket)
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async serverTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {


            let ports = PortHelper();
            const staticResolve = 'http://127.0.0.1:' + ports.server;
            logger.info(`before servers ======================================================================`);
            ServerHelper(ports.server, serverType, MethodType.Local).then(server => {
                logger.info(`after servers ======================================================================`);
                logger.info(`before client ======================================================================`);
                wait(1000 * 10).then(() => {
                    ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then(client => {
                        logger.info(`======================================================================`);
                        CallHelper().then(methodResult => {
                            logger.info(`======================================================================`);
                            if (server)
                                server.kill();

                            if (client)
                                client.kill();

                            Expect(methodResult.result.add).toEqual('added');
                            if (server)
                                server.kill();

                            if (client)
                                client.kill();
                            resolve();
                        });
                    })
                })
            });
        });
    }

    // pass arguments into your test functions to keep your test code from being repetative
    // @TestCase(2, 2, 4)
    // @TestCase(2, 3, 5)
    // @TestCase(3, 3, 6)
    // @Test("addition tests")
    // public addTest(firstNumber: number, secondNumber: number, expectedSum: number) {
    //     Expect(firstNumber + secondNumber).toBe(expectedSum);
    // }
}


async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}
