import injection from '@methodus/server/injection';
import { TestTarget } from './controllers/target.test';
import { ExpressSecuredTestServer } from './https/express.server.https';

(async () => {
    const testTarget = injection.Injector.resolve<TestTarget>('TestTarget');
    let server: ExpressSecuredTestServer;
    await new Promise(async (resolve, reject) => {
        server = new ExpressSecuredTestServer();
        server.on('ready', () => {
            resolve({});
        });
    });

    try {
        const response = await testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
        return response;

    } catch (error) {
        console.log(error);
    }

})();



