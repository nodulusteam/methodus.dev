process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
import { TestClass } from '../classes/TestClass';
import { Server, ServerType, MethodType, MethodusConfig } from '../../index';
const redis_addr = '//192.168.99.100:32771';
const amqp = 'localhost:5672';

async function init() {
    let config = new MethodusConfig();
    if (process.env.servers) {
        process.env.servers.split(',').map((server: ServerType) => {
            config.run(server, { nsp: '/', port: process.env.PORT, client: redis_addr, server: redis_addr, userName: 'tmla', password: '1234', amqp: amqp });
            config.use(TestClass, process.env.METHODTYPE as MethodType, server, 'https://127.0.0.1:8090');
        })
    }


    await new Server(process.env.PORT).configure(config)
        .plugins([{ name: '@methodus/describe', options: {} }])
        .start();

    //const server = await new Server(process.env.PORT).configure(config).start();

    let myClass = new TestClass();
    try {

        const object_to_send: any = {
            name: 'testing object',
            date: new Date(),
            bool: true
        }

        let action5 = await myClass.action5(object_to_send, new Date(), new Date());




        let eventCounter = 0;
        let result = await myClass.action1(++eventCounter, `message number ${eventCounter}`);
        setInterval(async () => {
            result = await myClass.action1(++eventCounter, `message number ${eventCounter}`);

        }, 3 * 1000)
        // console.log(result);
        return result;
    } catch (error) {
        if (error.error && Buffer.isBuffer(error.error)) {
            console.error(error);
            const parsedError = error.error.toString();
            return Promise.reject(parsedError);

        } else {
            return Promise.resolve(error);
        }
    }
}

init().then((result) => {
    //console.log(result);
});





