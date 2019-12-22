
import { WebRequest } from './web-request';
import { Verbs } from '../../verbs';

(async () => {
    {
        const request = new WebRequest();
        const result = await request.sendRequest(Verbs.Post, 'https://jsonplaceholder.typicode.com/posts', [
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
        console.log(result);
    }

    // {
    //     const request = new WebRequest();
    //     const result = request.sendRequest(Verbs.Get, 'https://jsonplaceholder.typicode.com/posts', [
    //     ], [
    //         { index: 0, from: 'params', },
    //         { index: 1, name: 'user', from: 'body' },
    //         { index: 2, name: 'files', from: 'files' },
    //         { index: 3, name: 'forkKey', from: 'query' }
    //     ]);
    //     console.log(result);
    // }




})()


