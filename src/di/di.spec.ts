import { Test, Expect, TestFixture, Timeout } from 'alsatian';
import { Injector } from './decorators';
import { ExpressTestServer } from './tests/server';




@TestFixture('Injection decorators')
export class ModulesTest {

    @Test('Create server')
    @Timeout(1000 * 1000)
    public async createServer() {
        const module = Injector.get(ExpressTestServer);
        Expect(module).toBeDefined();
    }
}
