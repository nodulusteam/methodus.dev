// import mock = require('mock-require');
// mock('redis', require('redis-mock'));



import { TestClass } from '../classes/TestClass';
import { FirstClass } from '../classes/FirstClass';
import { Server, MethodType, MethodusConfig } from '../../index';

process.env.silent = false;
process.env.test = true;
const redis_addr = '//localhost:5672';
let config = new MethodusConfig();
if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, {
            nsp: '/',
            port: process.env.PORT, userName: 'tmla',
            password: '1234', client: redis_addr, server: redis_addr, amqp: 'localhost:5672', heartbeat: 5
        });
        config.use(FirstClass, MethodType.Local, server);
        config.use(TestClass, MethodType[process.env.METHODTYPE as string], server, 'http://localhost:8090');
    })
}
async function init() {
    const server = await new Server(process.env.PORT).configure(config)
        .plugins(['@tmla-plugins/describe'])
        .start();
}



init();
