import { TestClass } from '../classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../../index';

process.env.silent = false;

let config = new MethodulusConfig(process.env.servers);
config.use(TestClass, process.env.METHODTYPE);
const server = new Server(process.env.PORT).configure(config).start();

