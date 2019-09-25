
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { WebRequest } from './web-request';
import { Verbs } from '../../verbs';

@TestFixture('Test Proxy decorator')
export class ProxyTest {

    @Test('test Request object')
    @TestCase('{ "prop1": "1", "prop2": "2" }')
    public async createNew(object: any) {

        try {
            const request = new WebRequest();
            const result = request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [], []);
            Expect(result).not.toBeNull();
        } catch (error) {

        }

    }
}
