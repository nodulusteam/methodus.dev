process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { MethodType, MethodusConfig, Server, ServerType } from '../../index';
import { TestClass } from '../classes/TestClass';
const redis_addr = '//192.168.99.100:32771';
const amqp = 'localhost:5672';

async function init() {
    const config = new MethodusConfig();
    if (process.env.servers) {
        process.env.servers.split(',').forEach((server: ServerType) => {
            config.run(server, {
                nsp: '/', port: process.env.PORT, client: redis_addr,
                server: redis_addr, userName: 'guest',
                password: '12' + '34', amqp,
            });
            config.use(TestClass, process.env.METHODTYPE as MethodType, server, 'http://127.0.0.1:8090');
        });
    }

    await new Server(process.env.PORT).configure(config)
        // .plugins([{ name: '@methodus/describe', options: {} }])
        .start();

    // const server = await new Server(process.env.PORT).configure(config).start();

    const myClass = new TestClass();
    try {

        // const object_to_send: any = {
        //     name: 'testing object',
        //     date: new Date(),
        //     bool: true,
        // };

        // const action5 = await myClass.action5(object_to_send, new Date(), new Date());

        let eventCounter = 0;
        let result = await myClass.action1(++eventCounter, `message number ${eventCounter}`);
        setInterval(async () => {
            result = await myClass.action1(++eventCounter, `message number ${eventCounter}`);

        }, 3 * 1000);
        // console.log(result);
        return result;
    } catch (error) {
        if (error.error && Buffer.isBuffer(error.error)) {
            const parsedError = error.error.toString();
            return Promise.reject(parsedError);

        } else {
            return Promise.resolve(error);
        }
    }
}

init().then((result) => {
    // console.log(result);
});
