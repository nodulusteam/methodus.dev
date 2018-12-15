import { Server, MethodType, MethodusConfig } from '../../index';
import { MiddleWaresClass } from '../classes/MiddleWaresClass';
import { ServerType } from '../../interfaces';

const redis_addr = '//192.168.99.100:32771';
const config = new MethodusConfig();
if (process.env.servers) {
    process.env.servers.split(',').forEach((server: ServerType) => {
        config.run(server, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: 'localhost' });
        config.use(MiddleWaresClass, MethodType.Local, server);
    });
}

new Server(process.env.PORT).configure(config).start();
