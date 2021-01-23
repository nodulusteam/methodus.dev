import { ExpressTestServer } from './http/express.server';
import request from 'supertest';

(async () => {
    let server: any;
    await new Promise(async (resolve, reject) => {
        server = new ExpressTestServer();
        server.on('ready', () => {
            resolve({});
        });
    });

    //  const testTarget = injection.Injector.resolve<TestTarget>('TestTarget');
   return request(server?.server._app.express._app).get('/api/player/1')
        .expect(500);

})();

// request.get('/api/playerdata/defaults').then(console.log).catch(console.error);

// try {
//     const response = await testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
//     return response;

// } catch (error) {
//     console.log(error);
// }

// }) ();



