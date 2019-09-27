process.env.test = 'true';
import { AsyncTest, Expect, TestFixture, Timeout, AsyncSetupFixture, AsyncTeardownFixture } from 'alsatian';
import { ExpressTestServer } from './servers/express.server';
import { TestTarget } from './controllers';
import { Injector } from './shim';

@TestFixture('Test Express configuration')
export class Servers {
    public testTarget: TestTarget;
    constructor() {
        this.testTarget = Injector.get(TestTarget);

    }

    server: any;
    @AsyncSetupFixture
    public async serverSetup() {
        return new Promise(async (resolve, reject) => {
            this.server = new ExpressTestServer();
            this.server.on('ready', () => {
                resolve();
            });
        });
    }

    @AsyncTeardownFixture
    public async serverKill() {
        this.server.kill();
    }

    @AsyncTest('list')
    @Timeout(1000 * 1000)
    public async list() {
        const response = await this.testTarget.list('someauth', 'up');
        Expect(response.result.length).toBe(5);

    }

    @AsyncTest('list')
    @Timeout(1000 * 1000)
    public async listDefaults() {
        const response = await this.testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
        Expect(response.result.length).toBe(5);

    }

    @AsyncTest('create')
    @Timeout(1000 * 1000)
    public async create() {
        const response = await this.testTarget.create('cookie-value', {}, 'my user name');
        Expect(response.result.name).toBe('my user name');
    }

    @AsyncTest('read')
    @Timeout(1000 * 1000)
    public async read(): Promise<any> {
        try {
            const response = await this.testTarget.read(511798);
            return response;
        } catch (ex) {
            Expect(ex.error).toBe('intended error');
        }

    }

}
