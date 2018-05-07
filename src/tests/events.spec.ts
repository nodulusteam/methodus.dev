 
import { Gateway } from './classes/Gateway';
import { FirstClass } from './classes/FirstClass';
import { SecondClass } from './classes/SecondClass';
import { ThirdClass } from './classes/ThirdClass';

const redis_addr = '//192.168.99.100:32768';


const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = './tests/config';
process.env.methodus_name = 'event-caller';
const staticResolve = 'http://127.0.0.1:8090';



import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from 'alsatian';
import { TestClass } from './classes/TestClass';
import { logger, Server, ServerType, MethodusConfig, MethodType } from '../index';
import { ServerHelper, EventHelper, ServerClassHelper, ClientHelper, CallHelper, PortHelper } from './helpers'




@TestFixture('Test all servers Event system')
export class EventsServers {
    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('testing the event communication system')
    // @TestCase(ServerType.Express, MethodType.Http)
    @TestCase(ServerType.RabbitMQ, MethodType.MQ)
    //  @TestCase(ServerType.Socket, MethodType.Socket)
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async serverTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {
            let ports = PortHelper();
            const staticResolve = 'http://127.0.0.1:' + ports.server;
            ServerHelper(ports.server, serverType, MethodType.Local).then(servers => {
                wait(1000 * 1).then(() => {
                    ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then(client => {
                        EventHelper().then(eventResult => {
                            if (servers)
                                servers.map(s => s.kill());

                            if (client)
                                client.kill();

                            Expect(eventResult).toBeDefined();
                            resolve();
                        }).catch((error) => {
                            console.log(error);
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
    // @Test('addition tests')
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





