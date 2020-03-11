import { WebRequest } from '../web-request';
import { Verbs } from '../verbs';
const TESTBASE = 'http://jsonplaceholder.typicode.com'; //'http://jsonplaceholder.typicode.com';
(async () => {
    const request = new WebRequest();

    await request.sendRequest(
        Verbs.Get,
        `${TESTBASE}/posts/:key1/:key2`,
        [
            'value1',
            'value2',

            //{ key1: 'value1', key2: 'value2' },
            // { key1: 'value1', key2: 'value2' },
            //  [], { key1: ['value1', 'value2'], key2: 'value2' }, { user_id: 'id1' }
        ],
        [
            { index: 0, from: 'params', name: 'key1' },
            { index: 1, from: 'params', name: 'key2' },
            // { index: 1, from: 'body' },
            // { index: 2, from: 'files' },
            // { index: 3, from: 'query', name: 'key1' },
            // { index: 4, name: 'secure', from: 'security_context' },
        ]
    );

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
