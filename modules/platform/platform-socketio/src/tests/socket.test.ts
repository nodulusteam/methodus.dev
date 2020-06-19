import { SocketTestServer } from './servers/socket.server';
import { TestTarget } from './controllers/';
import { injectionModule as injection } from '@methodus/server';

(async () => {
    const testTarget = injection.Injector.get(TestTarget);
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
