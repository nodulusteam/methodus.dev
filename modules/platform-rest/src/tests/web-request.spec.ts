
import { WebRequest } from '../web-request';
import { Verbs } from '../verbs';

const TESTBASE = 'https://jsonplaceholder.typicode.com';

describe('Web request', () => {
    describe('Test all verbs', () => {
        jest.setTimeout(150 * 1000);
        it('Get list', async () => {
            const request = new WebRequest();
            const resultx = await request.sendRequest(Verbs.Get, `${TESTBASE}/posts`, [], []);
            expect(resultx.data.length === 100).toBeTruthy();
        });

        it('Get one', async () => {
            const request = new WebRequest();
            const result = await request.sendRequest(Verbs.Get, `${TESTBASE}/posts/:postid`, [
                1,
            ], [
                { index: 0, name: 'postid', from: 'params' }
            ]);
            expect(result.data.id === 1).toBeTruthy();
        });


        it('Post', async () => {
            const request = new WebRequest();
            const result = await request.sendRequest(Verbs.Post, `${TESTBASE}/posts/`, [
                {
                    id: 1,
                    userid: 1
                },
            ], [
                { index: 0, from: 'body' }
            ]);
            expect(result.statusText === 'Created').toBeTruthy();
        });

        it('Put', async () => {
         

            const request = new WebRequest();
            const result = await request.sendRequest(Verbs.Put, `${TESTBASE}/posts/:postid`, [
                1,
                {
                    id: 1,
                    userid: 1
                },
            ], [
                { index: 0, name: 'postid', from: 'params' },
                { index: 1, from: 'body' }
            ]);
            console.log(result.statusText);
            expect(result.statusText === 'OK').toBeTruthy();
        });
    });


    xit('test Request named collection objects', async () => {
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


    xit('test Request no name collection objects', async () => {
        const request = new WebRequest();
        const result = await request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [
            { key1: 'value1', key2: 'value2' },
            { key1: 'value1', key2: 'value2' },
            [],
            { key1: ['value1', 'value2'], key2: 'value2' },
            { user_id: 'id1' },
            [{ 'Content-Type': 'application/json' }],
            [{ 'Content-Type': 'application/json' }],

        ], [
            { index: 0, from: 'params', },
            { index: 1, from: 'body' },
            { index: 2, from: 'files' },
            { index: 3, from: 'query', name: 'key1' },
            { index: 4, name: 'secure', from: 'security_context' },
            { index: 5, from: 'headers' },
            { index: 6, from: 'cookies' },
        ]);
        expect(result).not.toBeNull();
    });

});

