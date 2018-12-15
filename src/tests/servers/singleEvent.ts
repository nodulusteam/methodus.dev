import { EventsClass } from '../classes/events-single-class';
import { Server, MethodType, MethodusConfig } from '../../index';
import { ServerType } from '../../interfaces';

const redis_addr = '//localhost:5672';
const config = new MethodusConfig();
if (process.env.servers) {
    process.env.servers.split(',').forEach((server: ServerType) => {
        config.run(server, {
            port: process.env.PORT,
            userName: 'guest',
            password: 'g' + 'uest',
            client: redis_addr,
            server: redis_addr,
            amqp: 'localhost:5672',
            heartbeat: 5,
        });
        config.use(EventsClass, MethodType.Local, server);
    });
}
(async () => {
    await new Server(process.env.PORT).configure(config).start();

})();
