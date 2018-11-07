process.env.CONFIG_PATH = './tests/config';
process.env.test = 'true';

import { AsyncTest, Expect, TestCase, TestFixture, Timeout } from 'alsatian';
import { TestClass } from './classes/TestClass';
import { ServerType, MethodType, logger } from '../index';
import { Wait, ServerHelper, ClientHelper, CallHelper, PortHelper } from './helpers';

@TestFixture('Test all servers RPC')
export class Servers {

    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('asychronous test')
    @TestCase(ServerType.Express, MethodType.Http, 'http')
    // @TestCase(ServerType.HTTP2, MethodType.Http2, 'https')
    // @TestCase(ServerType.RabbitMQ, MethodType.MQ, 'http')
    // @TestCase(ServerType.Socket, MethodType.Socket, 'http')
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async serverTest(serverType, methodType, protocol) {
        return new Promise(async (resolve, reject) => {
            logger.info('start server test for', serverType, methodType, protocol);
            const ports = PortHelper();
            const staticResolve = `${protocol}://127.0.0.1:${ports.server}`;
            ServerHelper(ports.server, serverType, MethodType.Local).then((servers) => {
                Wait(1000 * 5).then(() => {
                    logger.info('server ready, calling');
                    ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then((client) => {
                        logger.info('client is ready:', client);
                        CallHelper().then((methodResult) => {
                            logger.error('method called, result is:', methodResult);
                            if (servers) {
                                servers.forEach((s) => s.kill());
                            }

                            if (client) {
                                client.kill();
                            }

                            Expect(methodResult.result.add).toBeDefined();
                            if (servers) {
                                servers.forEach((s) => s.kill());
                            }

                            if (client) {
                                client.kill();
                            }
                            resolve();
                        });
                    });
                });
            });
        });
    }
}
