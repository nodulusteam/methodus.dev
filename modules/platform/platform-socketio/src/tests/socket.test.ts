import { SocketTestServer } from './servers/socket.server';
import { TestTarget } from './controllers/';
import injection from '@methodus/server/injection';

(async () => {
    const testTarget = injection.Injector.resolve<TestTarget>('TestTarget');
    let server: SocketTestServer;

    await new Promise(async (resolve, reject) => {
        server = new SocketTestServer();
        server.on('ready', () => {
            resolve();
        });
    });

    const response = await testTarget.list('someauth', 'up');
    console.log(response);
})();
