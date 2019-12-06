process.env.test = 'true';
import { Test, Expect, TestFixture, Timeout } from 'alsatian';
import { MethodusConfig, MethodusClassConfig } from '../config';
/**
 * @hidden
 */
@TestFixture('Test additional method classes')
export class Units {

    @Test('MethodusConfig')
    @Timeout(1000 * 1000)
    public async createMethodusConfig() {
        const config = new MethodusConfig(undefined, undefined);
        Expect(config).toBeDefined();
    }

    @Test('MethodusConfig')
    @Timeout(1000 * 1000)
    public async createMethodusConfigWithServers() {
        const config = new MethodusConfig([], new Map<string, MethodusClassConfig>());
        Expect(config).toBeDefined();
    }

}
