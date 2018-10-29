import { TestClass } from '../classes/TestClass';
import { FirstClass } from '../classes/FirstClass';
import { Server, MethodType, MethodusConfig } from '../../index';
import { ServerType } from '../../interfaces';

const redis_addr = '//localhost:5672';
const config = new MethodusConfig();
if (process.env.servers) {
    process.env.servers.split(',').forEach((server: ServerType) => {
        config.run(server, {
            nsp: '/',
            port: process.env.PORT,
            userName: 'guest',
            password: 'g' + 'uest',
            client: redis_addr, server: redis_addr, amqp: 'localhost:5672', heartbeat: 5,
        });
        config.use(FirstClass, MethodType.Local, server);
        config.use(TestClass, process.env.METHODTYPE as MethodType, server, 'http://localhost:8090');
    });
}
async function init() {
    await new Server(process.env.PORT).configure(config)
        // .plugins([{ name: '@methodus/describe', options: {} }])
        .start();
}

init();
