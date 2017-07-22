// import mock = require('mock-require');
// mock('redis', require('redis-mock'));



import { TestClass } from '../classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../../index';

process.env.silent = false;

let config = new MethodulusConfig(process.env.servers);
config.use(TestClass, process.env.METHODTYPE, 'http://localhost:8090');
const server = new Server(process.env.PORT).configure(config).start();

