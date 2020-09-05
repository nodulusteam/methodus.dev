import { injectionModule as injection } from '@methodus/server';
import { TestTarget } from './controllers/target.test';
import { ExpressSecuredTestServer } from './https/express.server.https';

(async () => {
    const testTarget = injection.Injector.get(TestTarget);
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



