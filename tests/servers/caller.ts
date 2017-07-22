import { TestClass } from '../classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../../index';

process.env.silent = false;
async function init() {
    let config = new MethodulusConfig(process.env.servers);
    config.use(TestClass, process.env.METHODTYPE, 'http://localhost:8090');
    const server = new Server(process.env.PORT).configure(config).start();

    let myClass = new TestClass();
    try {
        let result = await myClass.action1(1, 'roi');
        console.log(result);
        return result;
    } catch (error) {
        return Promise.resolve(error);
    }

}

init().then((result) => {
    console.log(result);
});





