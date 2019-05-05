process.env.test = 'true';
import { AsyncTest, Expect, TestFixture, Timeout, AsyncSetupFixture, AsyncTeardownFixture } from 'alsatian';
import { EmitterTestServer } from './servers/';
import { resultEmitter } from './servers/emitter.plugin';
import { TestTarget } from './controllers/target.test';

@TestFixture('Test Emitter configuration')
export class Servers {
    server: any;

    @AsyncSetupFixture
    public async serverSetup() {
        return new Promise(async (resolve, reject) => {
            this.server = new EmitterTestServer();
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
        resultEmitter.on('list', (data) => {
            Expect(data.result.length).toBe(5);
        });
        await TestTarget.list('someauth', 'up');
    }

    @AsyncTest('list')
    @Timeout(1000 * 1000)
    public async listDefaults() {
        resultEmitter.on('listdefaults', (data) => {
            Expect(data.result.length).toBe(5);
        });

        await TestTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});

    }

    @AsyncTest('read')
    @Timeout(1000 * 1000)
    public async read(): Promise<any> {
        resultEmitter.on('read', (data) => {
            Expect(data.error).toBe('intended error');
        });
        await TestTarget.read(511798);
    }
}
