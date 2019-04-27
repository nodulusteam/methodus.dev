process.env.CONFIG_PATH = './tests/config';
process.env.test = 'true';

import { AsyncTest, Expect, TestFixture, Timeout, AsyncSetupFixture, AsyncTeardownFixture } from 'alsatian';
import { Xserver } from './servers/fastify.server';
import { TestTarget } from './target.test';

@TestFixture('Test Xserver configuration')
export class Servers {
    server: any;
    @AsyncSetupFixture
    public async serverSetup() {
        return new Promise(async (resolve, reject) => {
            this.server = new Xserver();
            setTimeout(async () => {
                resolve();
            }, 1000 * 2);
        });
    }

    @AsyncTeardownFixture
    public async serverKill() {
        this.server.kill();
    }

    @AsyncTest('list')
    @Timeout(1000 * 1000)
    public async list() {
        const response = await TestTarget.list('someauth', 'up');
        Expect(response.result.length).toBe(5);

    }

    @AsyncTest('list')
    @Timeout(1000 * 1000)
    public async listDefaults() {
        const response = await TestTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
        Expect(response.result.length).toBe(5);

    }

    @AsyncTest('create')
    @Timeout(1000 * 1000)
    public async create() {
        const response = await TestTarget.create('cookie-value', {}, 'my user name');
        Expect(response.result.name).toBe('my user name');
    }

    @AsyncTest('read')
    @Timeout(1000 * 1000)
    public async read() {
        try {
            const response = await TestTarget.read(511798);
        } catch (ex) {
            Expect(ex.error).toBe('intended error');
        }

    }

}
