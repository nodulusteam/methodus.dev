

process.env.CONFIG_PATH = './tests/config';
import { AsyncTest, Expect, TestCase, TestFixture, Timeout } from 'alsatian';
import { TestClass } from './classes/TestClass';
import { ServerType, MethodType } from '../index';
import { Wait, ServerHelper, ClientHelper, CallHelper, PortHelper } from './helpers'

@TestFixture('Test all servers RPC')
export class Servers {

    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('asychronous test')
    @TestCase(ServerType.Express, MethodType.Http, 'http')
    @TestCase(ServerType.HTTP2, MethodType.Http2, 'https')
    //@TestCase(ServerType.RabbitMQ, MethodType.MQ)
    //@TestCase(ServerType.Socket, MethodType.Socket)
    //@TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async serverTest(serverType, methodType, protocol) {
        return new Promise(async (resolve, reject) => {


            let ports = PortHelper();
            const staticResolve = `${protocol}://127.0.0.1:${ports.server}`;
            ServerHelper(ports.server, serverType, MethodType.Local).then(servers => {
                Wait(1000 * 10).then(() => {
                    ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then(client => {
                        CallHelper().then(methodResult => {

                            if (servers)
                                servers.map(s => s.kill());

                            if (client)
                                client.kill();
                            console.log(methodResult);
                            Expect(methodResult.result.add).toBeDefined();
                            if (servers)
                                servers.map(s => s.kill());

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
    // @Test('addition tests')
    // public addTest(firstNumber: number, secondNumber: number, expectedSum: number) {
    //     Expect(firstNumber + secondNumber).toBe(expectedSum);
    // }
}


