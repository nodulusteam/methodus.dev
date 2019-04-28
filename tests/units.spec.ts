process.env.test = 'true';
import { AsyncTest, Expect,  TestFixture, Timeout } from 'alsatian';

import { MethodusConfig } from '../src/config';

@TestFixture('Test additional method classes')
export class Units {

    @AsyncTest('MethodusConfig')
    @Timeout(1000 * 1000)
    public async createMethodusConfig() {
        const config = new MethodusConfig(undefined, undefined);
        Expect(config).toBeDefined();
    }

}
