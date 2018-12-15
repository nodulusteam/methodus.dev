import { AsyncTest, TestFixture, Timeout } from 'alsatian';
process.env.test = 'true';
process.env.CONFIG_PATH = './tests/config';
import { MiddleWaresClass, MiddleWaresClass2 } from './classes/MiddleWaresClass';
import { Server, MethodusConfig, MethodType } from '../index';

@TestFixture('Test multiple middlewares')
export class Servers {
    // use the async/await pattern in your tests as you would in your code
    @AsyncTest('asychronous test')
    // @TestCase(ServerType.Express, MethodType.Http)
    @Timeout(50000)
    public async serverTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {
            const redis_addr = '//192.168.99.100:32771';
            const config = new MethodusConfig();
            config.run(serverType, {
                port: process.env.PORT, client: redis_addr,
                server: redis_addr, amqp: 'localhost',
            });
            config.use(MiddleWaresClass, MethodType.Local, serverType);
            config.use(MiddleWaresClass2, MethodType.Local, serverType);
            new Server(process.env.PORT).configure(config).start();
        });
    }
}
