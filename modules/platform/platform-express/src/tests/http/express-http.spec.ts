import injection from '@methodus/server/injection';
import { TestTarget } from '../controllers/target.test';
import { ExpressTestServer } from './express.server.http';


describe('Test Express configuration', () => {
    const testTarget = injection.Injector.resolve<TestTarget>('TestTarget');
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
            await testTarget.getByField('field', 511798);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('delete', async () => {
        const result = await testTarget.delete();
        expect(result).toBeDefined();
        const result2 = await testTarget.delete2();
        expect(result2).toBeDefined();
    });


    it('delete2', async () => {
        const result2 = await testTarget.delete2();
        expect(result2).toBeDefined();
    });

    it('headers', async () => {
        const result2 = await testTarget.headers({ applicaiotn: 'json' });
        expect(result2).toBeDefined();
    });

    it('buffer1', async () => {
        const result2 = await testTarget.buffer1();
        expect(result2).toBeDefined();
    });
});
