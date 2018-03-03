import { ThirdClass } from '../../classes/ThirdClass';
import { ServerType, Server, MethodType, MethodusConfig } from '../../../index';


let config = new MethodusConfig();
const redis_addr = '//192.168.99.100:32768';

if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });

        config.use(ThirdClass, process.env.METHODTYPE, server, 'http://127.0.0.1:8093');
    })
}



async function init() {
    const server = await new Server(process.env.PORT).configure(config).start();
}

init();
