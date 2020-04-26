import { TestTarget } from './controllers/target.test';
import { Injector } from '@methodus/server';
import { ExpressSecuredTestServer } from './servers/express.server.https';

(async () => {
    const testTarget = Injector.get(TestTarget);
    let server: ExpressSecuredTestServer;
    await new Promise(async (resolve, reject) => {
        server = new ExpressSecuredTestServer();
        server.on('ready', () => {
            resolve();
        });
    });

    try {
        const response = await testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
        return response;

    } catch (error) {
        console.log(error);
    }

})();



