// import mock = require('mock-require');
// mock('redis', require('redis-mock'));



import { TestClass } from '../classes/TestClass';
import { FirstClass } from '../classes/FirstClass';
import { Server, MethodType, MethodusConfig } from '../../index';
import { MiddleWaresClass } from '../classes/MiddleWaresClass';



process.env.silent = false;
const redis_addr = '//192.168.99.100:32771';
let config = new MethodusConfig();
if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: 'localhost' });
        config.use(MiddleWaresClass, MethodType.Local,server);
    })
}


  new Server(process.env.PORT).configure(config).start();

