import { FirstClass } from '../../classes/FirstClass';
import { SecondClass } from '../../classes/SecondClass';
import { ThirdClass } from '../../classes/ThirdClass';
import {
    ServerConfig, ClientConfig, ConfiguredServer, MethodulusConfig,
    MethodulusClassConfig, MethodType, ServerType
} from '../../../index';

process.env.test = true;
const redis_addr = '//192.168.99.100:32768';
let server: ServerType = process.env.servers.split(',')[0];

@ServerConfig(server, { 'source': 'dynamic', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' })
@ClientConfig(FirstClass, process.env.METHODTYPE, 'http://127.0.0.1:8091')
@ClientConfig(SecondClass, process.env.METHODTYPE, 'http://127.0.0.1:8091')
@ClientConfig(ThirdClass, process.env.METHODTYPE, 'http://127.0.0.1:8091')
class SetupServer extends ConfiguredServer {
}



new SetupServer();

