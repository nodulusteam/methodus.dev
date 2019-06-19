
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { Request } from './Request';
import { Verbs } from '../../verbs';

@TestFixture('Test Proxy decorator')
export class ProxyTest {

    @Test('test Request object')
    @TestCase('{ "prop1": "1", "prop2": "2" }')
    public async createNew(object: any) {

        try {
            const request = new Request();
            const result = await request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [], []);
            Expect(result).not.toBeNull();
        } catch (error) {

        }

    }
}
