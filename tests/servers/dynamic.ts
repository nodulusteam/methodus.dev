import { EventsClass } from '../classes/events-class';
import { TestClass } from '../classes/TestClass';
import { FirstClass } from '../classes/FirstClass';
import { ServerType, Server, MethodType, MethodulusConfig } from '../../index';



let config = new MethodulusConfig();

const redis_addr = '//192.168.99.100:32768';


if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, { 'source': 'dynamic', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });

    })
}


async function init() {
    config.use(EventsClass, MethodType.Local, 'http://127.0.0.1:8090');
    config.use(TestClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
   // config.use(FirstClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
    await new Server(process.env.PORT).configure(config).start();


}

init();
