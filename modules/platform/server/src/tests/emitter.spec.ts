process.env.test = 'true';

import { EmitterTestServer } from './servers/emitter.server';
import { resultEmitter } from './servers/emitter.plugin';
import { TestTarget } from './controllers/';
import injection from '@methodus/framework-injection';



describe.skip('Test Emitter configuration', () => {
    let testTarget: TestTarget;
    let server: EmitterTestServer;

    afterAll(() => {
        server.kill();
    });

    beforeAll(() => {
        testTarget = injection.Injector.get(TestTarget);

        return new Promise(async (resolve, reject) => {
            server = new EmitterTestServer();
            server.on('ready', () => {
                resolve();
            });
        });

    });


    it.skip('testTypes', async () => {
        await testTarget.testTypes(new Date().toISOString() as any);
    });



    it.skip('list', async () => {
        resultEmitter.on('list', (data) => {
            expect(data.result.length).toBe(5);
        });
        await testTarget.list('someauth', 'up');
    });


    it.skip('listDefaults', async () => {
        resultEmitter.on('listdefaults', (data) => {
            expect(data.result.length).toBe(5);
        });

        await testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
    });

    it.skip('read', async () => {
        resultEmitter.on('read', (data) => {
            expect(data.error).toBe('intended error');
        });
        await testTarget.read(511798);
    });
});

