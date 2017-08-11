// no globals and typing support out of the box with intellisense
import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { TestClass } from './classes/test-class';
import { Server, ServerType, MethodulusConfig, MethodType } from '../index';
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



@TestFixture("Test all servers RPC")
export class Servers {

    // use the async/await pattern in your tests as you would in your code
    @AsyncTest("asychronous test")
   // @TestCase(ServerType.Express, MethodType.Http)
    @TestCase(ServerType.RabbitMQ, MethodType.MQ)
  //  @TestCase(ServerType.Socket, MethodType.Socket)
  //  @TestCase(ServerType.Redis, MethodType.Redis)
  //  @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async serverTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {

            //run the servers
            let server, client;

            try {
                let ports = PortHelper();
                const staticResolve = 'http://localhost:' + ports.server;
                server = await ServerHelper(ports.server, serverType, MethodType.Local);
                client = await ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve);
                // await wait(5 * 1000)
                let methodResult = await CallHelper();

                Expect(methodResult.result.add).toEqual('added');

            } catch (error) {
                console.log('got error', error);
            } finally {



            }

            if (server)
                server.kill();

            if (client)
                client.kill();
            resolve();

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