import { Verbs } from '../interfaces';
import { AuthType } from '@methodus/framework-commons';
import { WebRequest } from '../web-request';
const TESTBASE = 'http://jsonplaceholder.typicode.com';

(async () => {
    const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:key1/:key2`, resolver: TESTBASE };
    const webRequest = new WebRequest();
    const response = webRequest.sendRequest(
        methodus,
        `${TESTBASE}/posts/:key1/:key2`,
        [{ key1: 'value1', key2: 'value2' }, { key1: 'value1', key2: 'value2' }, [], { key1: ['value1', 'value2', 'value3'] }, { user_id: 'id1' }],
        [
            { index: 0, from: 'params' },
            { index: 1, from: 'body' },
            { index: 2, from: 'files' },
            { index: 3, from: 'query' },
            { index: 4, name: 'secure', from: 'security_context' },
        ]
    );
    webRequest.onBeforeRequest = () => {};
    const result = await response;
    console.log(result);
})();
