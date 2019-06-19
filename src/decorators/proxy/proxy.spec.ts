
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { ProxiedClass } from './test/proxy.test';

@TestFixture('Test Proxy decorator')
export class ProxyTest {

    @Test('createNew')
    @TestCase('{ "prop1": "1", "prop2": "2" }')
    @TestCase({ prop1: 1, prop2: 2 })
    public async createNew(object: any) {
        const result = new ProxiedClass();
        Expect(result).not.toBeNull();
    }
}
