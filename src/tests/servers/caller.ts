import { TestClass } from '../classes/TestClass';
import { Server, ServerType, MethodType, MethodusConfig } from '../../index';
const redis_addr = '//192.168.99.100:32771';
const amqp = 'localhost:5672';
 
process.env.silent = false;
async function init() {
    let config = new MethodusConfig();
    if (process.env.servers) {
        process.env.servers.split(',').map(server => {
            config.run(server, { nsp: '/', port: process.env.PORT, client: redis_addr, server: redis_addr, userName: 'tmla', password: '1234', amqp: amqp });
            config.use(TestClass, process.env.METHODTYPE, server, 'http://localhost:8090');
        })
    }


     await new Server(process.env.PORT).configure(config)
        .plugins(['@tmla-plugins/describe'])
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
        console.log(action5);




        let eventCounter = 0;
        let result = await myClass.action1(++eventCounter, `message number ${eventCounter}`);
        console.log(result);
        setInterval(async () => {
            let result = await myClass.action1(++eventCounter, `message number ${eventCounter}`);

            console.log(result);
        }, 3 * 1000)
        // console.log(result);
        return result;
    } catch (error) {
        return Promise.resolve(error);
    }

}

init().then((result) => {
    //console.log(result);
});





