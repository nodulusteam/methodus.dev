
import { WebRequest } from './web-request';
import { Verbs } from '../../verbs';

describe('Web request', () => {
    it('test Request named objects', async () => {
        const request = new WebRequest();
        const result = await request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [
            { key1: 'value1', key2: 'value2' },
            { key1: 'value1', key2: 'value2' },
            ['file1', 'file2'],
            'value1',
            { user_id: 'id1' },
            { 'Content-Type': 'application/json' },
            { 'Content-Type': 'application/json' },

        ], [
            { index: 0, name: 'param1', from: 'params', },
            { index: 1, name: 'user', from: 'body' },
            { index: 2, name: 'files', from: 'files' },
            { index: 3, name: 'forkKey', from: 'query' },
            { index: 4, name: 'secure', from: 'security_context' },
            { index: 5, name: 'Content-Type', from: 'headers' },
            { index: 5, name: 'Content-Type', from: 'cookies' },
        ]);
        expect(result).not.toBeNull();
    });

    it('test Request named collection objects', async () => {
        const request = new WebRequest();
        const result = await request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [
            { key1: 'value1', key2: 'value2' },
            { key1: 'value1', key2: 'value2' },
            [],
            'value1',
            { user_id: 'id1' },
            [{ 'Content-Type': 'application/json' }],
            [{ 'Content-Type': 'application/json' }],

        ], [
            { index: 0, from: 'params', },
            { index: 1, from: 'body' },
            { index: 2, from: 'files' },
            { index: 3, from: 'query' },
            { index: 4, name: 'secure', from: 'security_context' },
            { index: 5, from: 'headers' },
            { index: 6, from: 'cookies' },
        ]);
        expect(result).not.toBeNull();
    });

});

