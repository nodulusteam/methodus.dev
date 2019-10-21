process.env.test = 'true';
import { Test, Expect, TestFixture, Timeout, SetupFixture, AsyncTeardownFixture } from 'alsatian';
import { SocketTestServer } from './servers/socket.server';
import { TestTarget } from './controllers/';
import { Injector } from './shim';


@TestFixture('Test SocketIO configuration')
export class Servers {
    server: any;

    private testTarget: TestTarget = Injector.get(TestTarget);
    constructor() {

    }
    @SetupFixture
    public async serverSetup() {
        return new Promise(async (resolve) => {
            this.server = new SocketTestServer();
            this.server.on('ready', () => {
                resolve();
            });
        });
    }

    @AsyncTeardownFixture
    public async serverKill() {
        this.server.kill();
    }


    @Test('list')
    @Timeout(1000 * 1000)
    public async list() {
        const response = await this.testTarget.list('someauth', 'up');
        Expect(response.result.length).toBe(5);

    }

    @Test('list')
    @Timeout(1000 * 1000)
    public async listDefaults() {
        const response = await this.testTarget.listdefaults({ param1: '1', param2: '2' }, {}, {}, {}, {}, {}, {}, {}, {});
        Expect(response.result.length).toBe(5);

    }

    @Test('read')
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
