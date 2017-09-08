import { EventsClass } from '../classes/events-class';
import { TestClass } from '../classes/TestClass';
import { ServerConfig, ClientConfig, ConfiguredServer, MethodulusConfig, MethodulusClassConfig, MethodType, ServerType } from '../../index';

// import {  Server, MethodType, MethodulusConfig } from '../../index';
// process.env.test=true;


// let config = new MethodulusConfig();

// const redis_addr = '//192.168.99.100:32768';
let server :ServerType=process.env.servers.split(',')[0];;
 
// if (process.env.servers) {
//     process.env.servers.split(',').map(server => {
//         config.run(server, { 'source': 'dynamic', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });

//     })
// }


// async function init() {
//     config.use(EventsClass, MethodType.Local, 'http://127.0.0.1:8090');
//     config.use(TestClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
//    // config.use(FirstClass, process.env.METHODTYPE, 'http://127.0.0.1:8090');
//     await new Server(process.env.PORT).configure(config).start();


// }

// init();

@ServerConfig(server, { port: process.env.PORT || 8020 })
@ClientConfig(TestClass, MethodType.Local)
@ClientConfig(EventsClass, MethodType.Local)
class SetupServer extends ConfiguredServer {

}

let s = new SetupServer();