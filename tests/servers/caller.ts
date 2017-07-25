import { TestClass } from '../classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../../index';
const redis_addr = '//192.168.99.100:32768';
process.env.silent = false;


async function init() {
    let config = new MethodulusConfig();

    if (process.env.servers) {
        process.env.servers.split(',').map(server => {
            config.run(server, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: 'localhost' });

        })
    }


    config.use(TestClass, process.env.METHODTYPE, 'http://localhost:8090');
    const server = new Server(process.env.PORT).configure(config).start();

    let myClass = new TestClass();
    try {
        let result = await myClass.action1(1, 'roi');

        return result;
    } catch (error) {
        return Promise.resolve(error);
    }

}

init().then((result) => {
    console.log(result);
});





