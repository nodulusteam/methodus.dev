
import { send } from '../index';
import { Verbs } from '../verbs';

describe('test the send function', () => {
    it('send', async () => {
        const methodus = { route: '/posts', verb: Verbs.Get, type: 'express', _auth: 0, resolver: () => 'https://jsonplaceholder.typicode.com' };

        const result = await send(methodus, [
            { key1: 'value1', key2: 'value2' },
            { key1: 'value1', key2: 'value2' },
            ['file1', 'file2'],
            'value1',
            { user_id: 'id1' },
            { 'Content-Type': 'application/json' },
            { 'Content-Type': 'application/json' },

        ],
            [
                { index: 0, name: 'param1', from: 'params', },
                { index: 1, name: 'user', from: 'body' },
                { index: 2, name: 'files', from: 'files' },
                { index: 3, name: 'forkKey', from: 'query' },
                { index: 4, name: 'secure', from: 'security_context' },
                { index: 5, name: 'Content-Type', from: 'headers' },
                { index: 5, name: 'Content-Type', from: 'cookies' },
            ]
            , {}
        );

        expect(result).toBeDefined();
        return result;
    });


    it('send with auth', async () => {
        const methodus = { route: '/posts', verb: Verbs.Get, type: 'express', _auth: { type: 1, options: { user: 'node', password: 'test' } }, resolver: () => 'https://jsonplaceholder.typicode.com' };

        const result = await send(methodus, [
            { key1: 'value1', key2: 'value2' },
            '<xml>value</xml>',
            ['file1', 'file2'],
            { key1: ['value1', 'value2', { key: 'key1' }], key2: 'value2', dateKey: new Date() },
            { user_id: 'id1' },
            { 'Content-Type': 'application/json' },
            { 'Content-Type': 'application/json' },

        ],
            [
                { index: 0, name: 'param1', from: 'params', },
                { index: 1, name: 'user', from: 'body' },
                { index: 2, name: 'files', from: 'files' },
                { index: 3, from: 'query' },
                { index: 4, name: 'secure', from: 'security_context' },
                { index: 5, name: 'Content-Type', from: 'headers' },
                { index: 5, name: 'Content-Type', from: 'cookies' },
            ]
            , {}
        );

        expect(result).toBeDefined();
        return result;
    });


    it('send with null resolver', async () => {
        const methodus = { route: '/posts', verb: Verbs.Get, type: 'express', _auth: 0, resolver: () => null };

        try {
            await send(methodus, [
                { key1: 'value1', key2: 'value2' },
                { key1: 'value1', key2: 'value2' },
                ['file1', 'file2'],
                'value1',
                { user_id: 'id1' },
                { 'Content-Type': 'application/json' },
                { 'Content-Type': 'application/json' },

            ],
                [
                    { index: 0, name: 'param1', from: 'params', },
                    { index: 1, name: 'user', from: 'body' },
                    { index: 2, name: 'files', from: 'files' },
                    { index: 3, name: 'forkKey', from: 'query' },
                    { index: 4, name: 'secure', from: 'security_context' },
                    { index: 5, name: 'Content-Type', from: 'headers' },
                    { index: 5, name: 'Content-Type', from: 'cookies' },
                ]
                , {}
            );
        } catch (error) {
            expect(error).toBeDefined();
        }




    });

});
