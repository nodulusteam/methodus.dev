import mockAxios from 'jest-mock-axios';
import { Verbs } from '../index';
import { send } from '../sender';
import { WebRequest } from '../web-request';

const TESTBASE = 'http://jsonplaceholder.typicode.com';

describe('Test the external send function', () => {
    afterEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });
    // let catchFn = jest.fn(),
    //     thenFn = jest.fn();

    it('Run using only send', async () => {
        WebRequest.prototype.send = jest.fn().mockImplementationOnce(() => {
            return {};
        });

        const methodus = {
            route: '/posts/:param1',
            verb: Verbs.Post,
            type: 'http',
            _auth: { type: 0 },
            resolver: () => TESTBASE,
        };

        await send(
            methodus,
            ['value1', { user_id: 'id1' }, 'value2'],
            [
                { index: 0, name: 'param1', from: 'params' },
                { index: 1, name: 'user', from: 'body' },
                { index: 2, name: 'forkKey', from: 'query' },
            ]
        );
        // .then(thenFn)
        // .catch(catchFn);

        expect(WebRequest.prototype.send).toHaveBeenCalledWith({
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            timeout: 300000,
            data: { user: { user_id: 'id1' } },
            url: `${TESTBASE}/posts/value1?forkKey=value2`,
        });
    });

    it('send with auth', async () => {
        const methodus = {
            route: '/posts',
            verb: Verbs.Post,
            type: 'http',
            _auth: { type: 1, options: { user: 'node', password: 'test' } },
            resolver: TESTBASE,
        };
        WebRequest.prototype.send = jest.fn().mockImplementationOnce(() => {
            return {};
        });
        await send(
            methodus,
            ['<xml>value</xml>', 'xxxxx/json'],
            [
                { index: 0, name: 'user', from: 'body' },
                { index: 1, name: 'Custom-Header', from: 'headers' },
            ]
        );

        expect(WebRequest.prototype.send).toHaveBeenCalledWith({
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'xxxxx/json',
                Authorization: 'Basic bm9kZTp0ZXN0',
            },

            method: 'post',
            timeout: 300000,
            data: { user: '<xml>value</xml>' },
            url: `${TESTBASE}/posts`,
        });
    });

    it('send with null resolver', async () => {
        let thenFn = jest.fn();

        const methodus = {
            route: '/posts',
            verb: Verbs.Get,
            type: 'http',
            _auth: { type: 0 },
            resolver: () => null,
        };

        await send(methodus, [], [])
            .then(thenFn)
            .catch((error) => {
                console.log(error);
                expect(error).toEqual(new Error('Missing base url for method /posts'));
            });
    });
});
