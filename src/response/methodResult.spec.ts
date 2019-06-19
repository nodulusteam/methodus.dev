
import { Expect, Test, TestCase, TestFixture, AsyncTest } from 'alsatian';
import { MethodResult } from './methodResult';
import { TestController } from '../tests/controllers/controller.test';
@TestFixture('Test MethodResult')
export class MethodResultTest {

    @Test('createNew')
    @TestCase('{ "prop1": "1", "prop2": "2" }')
    @TestCase({ prop1: 1, prop2: 2 })
    public async createNew(object: any) {
        const result = new MethodResult(object);
        Expect(result).not.toBeNull();
    }

    @AsyncTest('createWithLinks')
    @TestCase({ prop1: 1, prop2: 2 })
    public async createWithLinks(object: any) {
        const result = new MethodResult(object);
        result.linkAction('list', TestController, 'my-rel', {}, 'www.com');
        const linksResult = result.apply();
        Expect(linksResult.result).not.toBeNull();
        Expect(linksResult.getLinks()).not.toBeNull();
    }

}
