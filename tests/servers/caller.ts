process.env.test = true;

import { TestClass } from '../classes/TestClass';
import { EventsClass } from '../classes/events-class';
const redis_addr = '//192.168.99.100:32768';
import { ServerConfig, ClientConfig, ConfiguredServer, MethodType, ServerType } from '../../index';
let serverType: ServerType = process.env.servers.split(',')[0];
let methodType = process.env.servers.MethodType as MethodType;

@ServerConfig(serverType, { 'source': 'caller', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' })
@ClientConfig(TestClass, methodType, 'http://127.0.0.1:8090')
class SetupServer extends ConfiguredServer {

}

class Activator {
    public static async callAction() {
        let myClass = new TestClass();
        try {
            let result = await myClass.action1(1, 'roi');
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
}

async function init() {
    await new SetupServer();
    let result = await Activator.callAction();
    console.log(result);
}


init();







