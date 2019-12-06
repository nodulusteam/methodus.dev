process.env.test = 'true';
import { Test, Expect, TestFixture, Timeout, SetupFixture, TeardownFixture } from 'alsatian';
import { EmitterTestServer } from './servers/emitter.server';
import { resultEmitter } from './servers/emitter.plugin';
import { TestTarget } from './controllers/';
import { Injector } from '../di';

@TestFixture('Test Emitter configuration')
export class Servers {
    private testTarget: TestTarget
    constructor() {
        this.testTarget = Injector.get(TestTarget);
    }

    server: any;

    @SetupFixture
    public async serverSetup() {
        return new Promise(async (resolve, reject) => {
            this.server = new EmitterTestServer();
            this.server.on('ready', () => {
                resolve();
            });
        });
    }

    @TeardownFixture
    public async serverKill() {
        this.server.kill();
    }


    @Test('list')
    @Timeout(1000 * 1000)
    public async list() {
        resultEmitter.on('list', (data) => {
            Expect(data.result.length).toBe(5);
        });
        await this.testTarget.list('someauth', 'up');
    }


    @Test('listDefaults')
    @Timeout(1000 * 1000)
    public async listDefaults() {
        resultEmitter.on('listdefaults', (data) => {
            Expect(data.result.length).toBe(5);
        });

        await this.testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});

    }


    @Test('read')
    @Timeout(1000 * 1000)
    public async read(): Promise<any> {
        resultEmitter.on('read', (data) => {
            Expect(data.error).toBe('intended error');
        });
        await this.testTarget.read(511798);
    }
}
