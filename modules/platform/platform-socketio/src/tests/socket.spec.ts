import injection from '@methodus/server/injection';


import { SocketTestServer } from './servers/socket.server';
import { TestTarget } from './controllers/';




describe('Test SocketIO configuration', () => {
    const testTarget = injection.Injector.resolve<TestTarget>('TestTarget');
    let server: SocketTestServer;
    beforeAll(() => {
        return new Promise((resolve, reject) => {
            server = new SocketTestServer();
            server.on('ready', () => {
                resolve({});
            });
        });
    });

    it('list', async () => {
        const response = await testTarget.list('someauth', 'up');
        expect(response.result.length).toEqual(5);
    });

    afterAll(async () => {
        server.kill();
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
