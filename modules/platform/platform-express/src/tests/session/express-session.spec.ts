import injection from '@methodus/framework-injection';
import { TestTarget } from '../controllers/target.test';
import { ExpressTestServer } from './express.server.session';
describe('Test Express session configuration', () => {
    const testTarget = injection.Injector.get(TestTarget);
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
        const response = await testTarget.create();
        expect(response.result).toBeDefined();
        return true;
    });

});
