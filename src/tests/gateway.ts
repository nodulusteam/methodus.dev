process.env.test = 'true';
import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from 'alsatian';
import { Gateway } from './classes/Gateway';
import { FirstClass } from './classes/FirstClass';
import { SecondClass } from './classes/SecondClass';
import { ThirdClass } from './classes/ThirdClass';

import { ServerType, Server, MethodusConfig, MethodType } from '../index';
import { ServerClassHelper, ServerHelper, ClientHelper, CallHelper } from './helpers'

const redis_addr = '//192.168.99.100:32768';


const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = './tests/config';



const staticResolve = 'http://127.0.0.1:8090';

async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}


@TestFixture('Test a gateway configuration')
export class GatewayTest {
    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('a triple way gateway')
    // @TestCase(ServerType.Express, MethodType.Http)
    // //  @TestCase(ServerType.RabbitMQ, MethodType.MQ)
    // @TestCase(ServerType.Socket, MethodType.Socket)
    // @TestCase(ServerType.Redis, MethodType.Redis)
    // @TestCase(ServerType.Kafka, MethodType.Kafka)
    @Timeout(50000)
    public async testGateway() {
        let server, server2, server3, client;
        try {
            server = await ServerClassHelper('FirstClass', 8091, 'express', MethodType.Local);
            server2 = await ServerClassHelper('SecondClass', 8092, 'express', MethodType.Local);
            server3 = await ServerClassHelper('ThirdClass', 8093, 'express', MethodType.Local);
            let config = new MethodusConfig();
            config.run(ServerType.Express, { port: 8080, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });


            config.use(Gateway, MethodType.Local,ServerType.Express);
            config.use(FirstClass, MethodType.Http,ServerType.Express, 'http://127.0.0.1:8091');
            config.use(SecondClass, MethodType.Http,ServerType.Express, 'http://127.0.0.1:8092');
            config.use(ThirdClass, MethodType.Http,ServerType.Express, 'http://127.0.0.1:8093');

            let client = await new Server(8080).configure(config).start();
            await wait(5 * 1000);

            let gw = new Gateway();
            try {
                let result1: any = await gw.callFirstClass();
                Expect(result1.result.add).toBe('added');

            } catch (err) {
                console.log('call error', err);
            }

            try {
                let result2: any = await gw.callSecondClass();
                Expect(result2.result.add).toBe('added');
            } catch (err) {
                console.log('call error', err);
            }

            try {
                let result3: any = await gw.callThirdClass();
                Expect(result3.result.add).toBe('added');
            } catch (err) {
                console.log('call error', err);
            }


        } catch (error) {
            console.log('got error', error);
        } finally {
            await wait(5 * 1000);
            if (server)
                server.kill();
            if (server2)
                server2.kill();
            if (server3)
                server3.kill();
            if (client)
                client.kill();



        }

    }
}
