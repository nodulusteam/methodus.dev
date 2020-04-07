
import { send } from '../';
import { Verbs } from '../interfaces';
import { AuthType } from '@methodus/server';
const TESTBASE = 'http://jsonplaceholder.typicode.com'; //'http://jsonplaceholder.typicode.com';
(async () => {
    const methodus = {
        route: '/posts',
        verb: Verbs.Get,
        type: 'http',
        _auth: {
            type: AuthType.BearerToken, options: async function (_requestOptions: any) {

                return 'Bearer XXCSKJH234SKJDHSK234JHS234KJDHNBM234234NBMXCBIUSI234DKS324J6HD43K';
            }
        },
        resolver: () => TESTBASE,
    };

    const result = await send(
        methodus,
        [
            // { key1: 'value1', key2: 'value2' },
            // { key1: 'value1', key2: 'value2' },
            // ['file1', 'file2'],
            // 'value1',
            // { user_id: 'id1' },
            // { 'Content-Type': 'application/json' },
            // { 'Content-Type': 'application/json' },
        ],
        [
            // { index: 0, name: 'param1', from: 'params' },
            // { index: 1, name: 'user', from: 'body' },
            // { index: 2, name: 'files', from: 'files' },
            // { index: 3, name: 'forkKey', from: 'query' },
            // { index: 4, name: 'secure', from: 'security_context' },
            // { index: 5, name: 'Content-Type', from: 'headers' },
            // { index: 5, name: 'Content-Type', from: 'cookies' },
        ]
    );

    console.log(result);

    // //send get
    // const listResult = await request.sendRequest(Verbs.Get, `${TESTBASE}/posts/`, [], []);
    // console.log(listResult.data);

    // //send get
    // const getResult = await request.sendRequest(Verbs.Get, `${TESTBASE}/posts/:postid`, [1], [{ index: 0, name: 'postid', from: 'params' }]);
    // console.log(getResult.data);
    // send Post
    // const postResult = await request.sendRequest(Verbs.Post, `${TESTBASE}/posts/`, [{ id: 1, userid: 1 }], [{ index: 0, from: 'body' }]);
    // console.log(postResult.data);

    // // send Post
    // const result = await request.sendRequest(
    //     Verbs.Post,
    //     `${TESTBASE}/posts/:postid`,
    //     [
    //       1,
    //       {
    //         id: 1,
    //         userid: 1
    //       }
    //     ],
    //     [
    //       { index: 0, name: 'postid', from: 'params' },
    //       { index: 1, from: 'body' }
    //     ]
    //   );
})();
