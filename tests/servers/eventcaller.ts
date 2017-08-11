import { Gateway } from '../classes/Gateway';
import { FirstClass } from '../classes/FirstClass';

import { Server, MethodType, MethodulusConfig } from '../../index';
const redis_addr = '//192.168.99.100:32768';



async function init() {
    let config = new MethodulusConfig();

    if (process.env.servers) {
        process.env.servers.split(',').map(server => {
            config.run(server, { 'source':'eventcaller', port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });

        })
    }


    config.use(Gateway, MethodType.Local);
    config.use(FirstClass, MethodType.Http, 'http://127.0.0.1:8091');


    const server = await new Server(process.env.PORT).configure(config).start();

    let myClass = new Gateway();
    try {
        let result = await myClass.callFirstClass();

        return result;
    } catch (error) {
        return Promise.resolve(error);
    }

}

init().then((result) => {
    console.log(result);
});





