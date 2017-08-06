process.env.DEBUG = 'methodulus';

import { EventsClass } from '../classes/events-class';
import { TestClass } from '../classes/test-class';
import { FirstClass } from '../classes/FirstClass';
import { ServerType, Server, MethodType, MethodulusConfig } from '../../index';



let config = new MethodulusConfig();

const redis_addr = '//192.168.99.100:32768';


if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, {'source':'dynamic',  port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: 'localhost' });

    })
}

config.use(EventsClass, MethodType.Local, 'http://localhost:8090');
config.use(TestClass, process.env.METHODTYPE, 'http://localhost:8090');
config.use(FirstClass, process.env.METHODTYPE, 'http://localhost:8090');
const server = new Server(process.env.PORT).configure(config).start();

