
import { WebRequest } from './web-request';
import { Verbs } from '../../verbs';

describe('Web request', () => {
    it('test Request object', async () => {
        const request = new WebRequest();
        const result = request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [], []);
        expect(result).not.toBeNull();
    });


    it('test Request object', async () => {
        const request = new WebRequest();
        const result = request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [], []);
        expect(result).not.toBeNull();
    });
});

