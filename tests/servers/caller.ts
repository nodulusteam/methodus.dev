import { TestClass } from '../classes/test-class';
import { EventsClass } from '../classes/events-class';
import { Server, MethodType, MethodulusConfig } from '../../index';
const redis_addr = '//192.168.99.100:32768';



async function init() {
    let config = new MethodulusConfig();

    if (process.env.servers) {
        process.env.servers.split(',').map(server => {
            config.run(server, { 'source':'caller', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: 'localhost' });

        })
    }

    //config.use(EventsClass, MethodType.Local, 'http://localhost:8090');
    config.use(TestClass, process.env.METHODTYPE, 'http://localhost:8090');
    const server = await new Server(process.env.PORT).configure(config).start();

    let myClass = new TestClass();
    try {
        console.log('calling action1 on testclass...');
        let result = await myClass.action1(1, 'roi');
        console.log('result of call is:  ', result);
        // let result = await myClass.error();
        return result;
    } catch (error) {
        return Promise.resolve(error);
    }

}

init().then((result) => {
    console.log(result);
});





