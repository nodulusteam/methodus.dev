process.env.CONFIG_PATH = './tests/config';
process.env.methodus_name = 'event-caller';
process.env.test = 'true';
import { AsyncTest, Expect, TestCase, TestFixture, Timeout } from 'alsatian';
import { TestClass } from './classes/TestClass';
import { ServerType, MethodType } from '../index';
import { ServerHelper, EventHelper, ClientHelper, PortHelper } from './helpers';
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
            const ports = PortHelper();
            const staticResolve = 'http://127.0.0.1:' + ports.server;
            ServerHelper(ports.server, serverType, MethodType.Local).then((servers) => {
                wait(1000 * 1).then(() => {
                    ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then((client) => {
                        EventHelper().then((eventResult) => {
                            if (servers) {
                                servers.map((s) => s.kill());
                            }

                            if (client) {
                                client.kill();
                            }

                            Expect(eventResult).toBeDefined();
                            resolve();
                        }).catch((error) => {
                            console.log(error);
                        });
                    });
                });
            });
        });
    }
}

async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
