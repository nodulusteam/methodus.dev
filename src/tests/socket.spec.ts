process.env.test = 'true';
import { AsyncTest, Expect,  TestFixture, Timeout, AsyncSetupFixture, AsyncTeardownFixture } from 'alsatian';
import { SocketTestServer } from './servers/';
import { TestTarget } from './controllers/';

@TestFixture('Test SocketIO configuration')
export class Servers {
    server: any;
    @AsyncSetupFixture
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
    
    @AsyncTest('read')
    @Timeout(1000 * 1000)
    public async read(): Promise<any> {
        try {
            const response = await TestTarget.read(511798);
            return response;
        } catch (ex) {
            Expect(ex.error).toBe('intended error');
        }

    }

}
