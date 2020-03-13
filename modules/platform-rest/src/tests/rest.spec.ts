import mockAxios from 'jest-mock-axios';
import { send } from '../index';
import { Verbs } from '../verbs';

const TESTBASE = 'http://jsonplaceholder.typicode.com';

describe('test the send function', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    it('send', () => {
        const methodus = {
            route: '/posts/:param1',
            verb: Verbs.Post,
            type: 'http',
            _auth: { type: 0 },
            resolver: () => TESTBASE,
        };

        send(
            methodus,
            ['value1', { user_id: 'id1' }, 'value2'],
            [
                { index: 0, name: 'param1', from: 'params' },
                { index: 1, name: 'user', from: 'body' },
                { index: 2, name: 'forkKey', from: 'query' },
            ]
        )
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.request).toHaveBeenCalledWith({
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            timeout: 300000,
            data: { user: { user_id: 'id1' } },
            url: `${TESTBASE}/posts/value1?forkKey=value2`,
        });
    });

    it('send with auth', () => {
        const methodus = {
            route: '/posts',
            verb: Verbs.Post,
            type: 'http',
            _auth: { type: 1, options: { user: 'node', password: 'test' } },
            resolver: () => TESTBASE,
        };

        send(
            methodus,
            ['<xml>value</xml>', 'xxxxx/json'],
            [
                { index: 0, name: 'user', from: 'body' },
                { index: 1, name: 'Custom-Header', from: 'headers' },
            ]
        )
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.request).toHaveBeenCalledWith({
            headers: { 'Content-Type': 'application/json', 'Custom-Header': 'xxxxx/json' },
            auth: {
                password: 'test',
                username: 'node',
            },
            method: 'post',
            timeout: 300000,
            data: { user: '<xml>value</xml>' },
            url: `${TESTBASE}/posts`,
        });
    });

    it('send with null resolver', () => {
        let thenFn = jest.fn();

        const methodus = {
            route: '/posts',
            verb: Verbs.Get,
            type: 'http',
            _auth: { type: 0 },
            resolver: () => null,
        };

        send(methodus, [], [])
            .then(thenFn)
            .catch(error => {
                console.log(error);
                expect(error).toBe(new Error('Missing base url for method /posts'));
            });
    });
});
