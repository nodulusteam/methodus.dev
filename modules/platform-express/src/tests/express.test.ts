import { ExpressTestServer } from './servers/express.server';
import { TestTarget } from './controllers/target.test';
import { Injector } from '@methodus/server';

(async () => {
    const testTarget = Injector.get(TestTarget);
    let server: ExpressTestServer;
    await new Promise(async (resolve, reject) => {
        server = new ExpressTestServer();
        server.on('ready', () => {
            resolve();
        });
    });
    const response = await testTarget.buffer1();
    console.log(response);
})();



