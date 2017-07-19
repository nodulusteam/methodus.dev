import { TestClass } from '../classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../../index';

process.env.silent = true;


MethodulusConfig.config['TestClass'] = process.env.METHODTYPE;
MethodulusConfig.servers = process.env.servers;
const server = new Server(process.env.PORT);
server.useClass(TestClass);
