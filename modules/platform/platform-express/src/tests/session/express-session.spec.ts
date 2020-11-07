import injection from '@methodus/server/injection';
import { TestTarget } from '../controllers/target.test';
import { ExpressTestServer } from './express.server.session';
describe('Test Express session configuration', () => {
    let testTarget:TestTarget;
    let server: ExpressTestServer;

    beforeAll(async () => {
        await new Promise(async (resolve, reject) => {
            server = new ExpressTestServer();
            server.on('ready', () => {
                testTarget = injection.Injector.resolve<TestTarget>('TestTarget');
                resolve();
            });
        });
    });

    afterAll(async () => {
        server.kill();
    });

    it('list', async () => {
        const response = await testTarget.create({},{},'some-name');
        expect(response.result).toBeDefined();
        return true;
    });

});
