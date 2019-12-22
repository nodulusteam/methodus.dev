import { ExpressTestServer } from './servers/express.server';
import { TestTarget } from './controllers/target.test';
import { Injector } from '@methodus/server';


describe('Test Express configuration', () => {
    const testTarget = Injector.get(TestTarget);
    let server: ExpressTestServer;
    beforeAll(async () => {
        await new Promise(async (resolve, reject) => {
            server = new ExpressTestServer();
            server.on('ready', () => {
                resolve();
            });
        });
    });

    afterAll(async () => {
        server.kill();
    });

    it('list', async () => {
        const response = await testTarget.list('someauth', 'up');
        expect(response.result.length).toEqual(5);
        return true;
    });

    it('listDefaults', async () => {
        const response = await testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
        expect(response.result.length).toBe(5);
    });


    it('create', async () => {
        const response = await testTarget.create('cookie-value', {}, 'my user name');
        expect(response.result.name).toBe('my user name');
    });

    it('read', async () => {
        try {
            await testTarget.read(511798);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('getByField', async () => {
        try {
            await testTarget.getByField(511798);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
    

});
