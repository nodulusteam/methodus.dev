import { EventsClass } from '../classes/events-class';
import { TestClass } from '../classes/TestClass';
import { ServerConfig, ClientConfig, ConfiguredServer, MethodulusConfig, MethodulusClassConfig, MethodType, ServerType } from '../../index';
process.env.test = true;
const redis_addr = '//192.168.99.100:32768';
let server: ServerType = process.env.servers.split(',')[0];

@ServerConfig(server, { 'source': 'dynamic', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' })
@ClientConfig(TestClass, MethodType.Local)
@ClientConfig(EventsClass, MethodType.Local)
class SetupServer extends ConfiguredServer {
}

let s = new SetupServer();