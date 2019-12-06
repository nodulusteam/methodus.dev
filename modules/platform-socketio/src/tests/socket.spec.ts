import { SocketTestServer } from './servers/socket.server';
import { TestTarget } from './controllers/';
import { Injector } from '@methodus/server';

describe('Test Express configuration', () => {
    const testTarget = Injector.get(TestTarget);
    let server: SocketTestServer;
    beforeAll(async () => {
        await new Promise(async (resolve, reject) => {
            server = new SocketTestServer();
            server.on('ready', () => {
                resolve();
            });
        });
    });

    // afterAll(async () => {
    //     server.kill();
    // });

    it('list', async () => {
        const response = await testTarget.list('someauth', 'up');
        expect(response.result.length).toEqual(5);
        return true;
    });

    // it('listDefaults', async () => {
    //     const response = await testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
    //     expect(response.result.length).toBe(5);
    // });

    // it('list', async () => {
    //     try {
    //         const response = await testTarget.read(511798);
    //         return response;
    //     } catch (ex) {
    //         expect(ex.error).toBe('intended error');
    //     }
    // });
});
