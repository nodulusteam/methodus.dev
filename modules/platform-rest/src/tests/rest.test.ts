import { WebRequest } from "../web-request";
import { Verbs } from '../verbs';
const TESTBASE = 'https://jsonplaceholder.typicode.com';
(async () => {
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



})();