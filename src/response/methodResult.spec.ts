
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { MethodResult } from './methodResult';

@TestFixture('Test MethodResult')
export class MethodResultTest {

    @Test('createNew')
    @TestCase('{ "prop1": "1", "prop2": "2" }')
    @TestCase({ prop1: 1, prop2: 2 })
    public async createNew(object: any) {
        const result = new MethodResult(object);
        Expect(result).not.toBeNull();
    }

}
