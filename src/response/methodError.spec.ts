
import { Expect, Test, TestCase, TestFixture, AsyncTest } from 'alsatian';
import { MethodError } from './methodError';

@TestFixture('Test MethodError')
export class MethodErrorTest {

    @Test('createNew')
    @TestCase('{ "prop1": "1", "prop2": "2" }')
    @TestCase({ prop1: 1, prop2: 2 })
    public async createNewMethodError(object: any) {
        const result = new MethodError(object);
        Expect(result).not.toBeNull();
    }

    @AsyncTest('createNewMethodErrorWithError')
    @TestCase()
    public async createNewMethodErrorWithError() {
        const result = new MethodError(new Error('my errror'));
        Expect(result).not.toBeNull();
    }

    @AsyncTest('createNewMethodErrorWithObjectError')
    @TestCase()
    public async createNewMethodErrorWithObjectError() {
        const result = new MethodError({ message: 'my-message', error: 'my-message', statusCode: 503 });
        Expect(result).not.toBeNull();
    }

}
