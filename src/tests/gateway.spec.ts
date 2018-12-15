
import { AsyncTest, Expect, TestCase, TestFixture, Timeout } from 'alsatian';
process.env.test = 'true';
import * as kill from 'kill-port';

import { Gateway } from './classes/Gateway';
import { FirstClass } from './classes/FirstClass';
import { SecondClass } from './classes/SecondClass';
import { ThirdClass } from './classes/ThirdClass';
import { ServerType, Server, MethodusConfig, MethodType } from '../index';
import { ServerClassHelper } from './helpers';
const redis_addr = '//192.168.99.100:32768';
process.env.CONFIG_PATH = './tests/config';

async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

@TestFixture('Test a gateway configuration')
export class GatewayTest {
    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('a triple way gateway')
    @TestCase(ServerType.Express, MethodType.Http, 'http')
    // @TestCase(ServerType.HTTP2, MethodType.Http2, 'https')
    // @TestCase(ServerType.RabbitMQ, MethodType.MQ, 'http')
    // @TestCase(ServerType.Socket, MethodType.Socket, 'http')

    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(30000)
    public async testGateway(serverType, methodType, protocol) {
        let server, server2, server3;
        await kill(8091).then(console.log)
            .catch(console.log);
        await kill(8092);
        await kill(8093);
        try {
            server = await ServerClassHelper('FirstClass', 8091, serverType, MethodType.Local);
            server2 = await ServerClassHelper('SecondClass', 8092, serverType, MethodType.Local);
            server3 = await ServerClassHelper('ThirdClass', 8093, serverType, MethodType.Local);
            const config = new MethodusConfig();
            config.run(serverType, { port: 8080, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
            config.use(Gateway, MethodType.Local, ServerType.Express);
            config.use(FirstClass, methodType, ServerType.Express, 'http://127.0.0.1:8091');
            config.use(SecondClass, methodType, ServerType.Express, 'http://127.0.0.1:8092');
            config.use(ThirdClass, methodType, ServerType.Express, 'http://127.0.0.1:8093');

            await new Server(8080).configure(config).start();
            await wait(5 * 1000);

            const gw = new Gateway();
            try {
                const result1: any = await gw.callFirstClass();
                console.log(result1.result);
                Expect(result1.result.add).toBe('added');

            } catch (err) {
                console.log('call error', err);
            }

            try {
                const result2: any = await gw.callSecondClass();
                console.log(result2.result);
                Expect(result2.result.add).toBe('added');
            } catch (err) {
                console.log('call error', err);
            }

            try {
                const result3: any = await gw.callThirdClass();
                console.log(result3.result);
                Expect(result3.result.add).toBe('added');
            } catch (err) {
                console.log('call error', err);
            }

        } catch (error) {
            console.log('got error', error);
        } finally {
            await wait(5 * 1000);
            if (server) {
                server.kill();
            }
            if (server2) {
                server2.kill();
            }
            if (server3) {
                server3.kill();
            }
        }
    }
}
