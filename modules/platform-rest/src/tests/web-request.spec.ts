import mockAxios from 'jest-mock-axios';
import { WebRequest } from '../web-request';
import { Verbs } from '../interfaces';
import { AuthType } from '@methodus/server';


const TESTBASE = 'http://jsonplaceholder.typicode.com';

describe('Web request tests for platform-rest', () => {

    jest.setTimeout(1000 * 30);
    afterEach(() => {
        mockAxios.reset();
    });

    xdescribe('Test all verbs', () => {


        xit(`Simple Get request, no auth, ${TESTBASE}/posts`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();
            const request = new WebRequest();
            const methodus = { verb: Verbs.Get, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts`, resolver: TESTBASE };
            const response = request
                .sendRequest(methodus, `${TESTBASE}/posts`, [], [])
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledTimes(1);
            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'get',
                timeout: 300000,
                url: `${TESTBASE}/posts`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });

        xit(`Simple Get request, use param variale , ${TESTBASE}/posts/:postid`, async () => {
            const request = new WebRequest();
            let catchFn = jest.fn(),
                thenFn = jest.fn();
            const methodus = { verb: Verbs.Get, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:postid`, resolver: TESTBASE };

            const response = request
                .sendRequest(methodus, `${TESTBASE}/posts/:postid`, [1], [{ index: 0, name: 'postid', from: 'params' }])
                .then(thenFn)
                .catch(catchFn);
            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'get',
                timeout: 300000,
                url: `${TESTBASE}/posts/1`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });

        xit(`Post request, JSON data ${TESTBASE}/posts ,  body is an object`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();
            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts`, resolver: TESTBASE };
            const response = request
                .sendRequest(methodus, `${TESTBASE}/posts/`, [{ id: 1, userid: 1 }], [{ index: 0, from: 'body' }])
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                timeout: 300000,
                data: {
                    id: 1,
                    userid: 1,
                },
                url: `${TESTBASE}/posts/`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });

        xit(`Post request , HTML data ${TESTBASE}/posts ,  body is an html`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();
            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts`, resolver: TESTBASE };
            const response = request
                .sendRequest(methodus, `${TESTBASE}/posts/`, [`</html></html>`], [{ index: 0, from: 'body' }])
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/xml' },
                method: 'post',
                timeout: 300000,
                data: '</html></html>',
                url: `${TESTBASE}/posts/`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });



        xit('Put request, With headers collection', async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();
            const request = new WebRequest();
            const methodus = { verb: Verbs.Put, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:postid`, resolver: 'http://www.googl.eomon' };
            const response = request
                .sendRequest(
                    methodus,
                    `${TESTBASE}/posts/:postid`,
                    [1, { id: 1, userid: 1 }, { 'Custom-Header': 'none' }],
                    [
                        { index: 0, name: 'postid', from: 'params' },
                        { index: 1, from: 'body' },
                        { index: 2, from: 'headers' },
                    ]
                )
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json', 'Custom-Header': 'none', },
                method: 'put',
                timeout: 300000,
                data: {
                    id: 1,
                    userid: 1,
                },
                url: `${TESTBASE}/posts/1`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });
    });

    xdescribe('Test arguments collections', () => {



        xit('test Request no name collection objects, Query as array', async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:key1/:key2`, resolver: TESTBASE };
            const response = request
                .sendRequest(
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
                )
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json', security_context: '{"user_id":"id1"}' },
                method: 'post',
                timeout: 300000,
                data: {
                    key1: 'value1',
                    key2: 'value2',
                },
                url: `${TESTBASE}/posts/value1/value2?key1=value1&key1=value2&key1=value3`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });

        xit('test Request no name collection objects, Query as array of Objects', async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:key1/:key2`, resolver: TESTBASE };
            const date = new Date();
            const response = request
                .sendRequest(
                    methodus,
                    `${TESTBASE}/posts/:key1/:key2`,
                    [{ key1: 'value1', key2: 'value2' }, { key1: 'value1', key2: 'value2' }, [], { key1: [date] }, { user_id: 'id1' }],
                    [
                        { index: 0, from: 'params' },
                        { index: 1, from: 'body' },
                        { index: 2, from: 'files' },
                        { index: 3, from: 'query' },
                        { index: 4, name: 'secure', from: 'security_context' },
                    ]
                )
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json', security_context: '{"user_id":"id1"}' },
                method: 'post',
                timeout: 300000,
                data: {
                    key1: 'value1',
                    key2: 'value2',
                },
                url: `${TESTBASE}/posts/value1/value2?key1=${encodeURIComponent(JSON.stringify(date))}`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });


        xit('test Request no name collection objects, Query as Objects', async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:key1/:key2`, resolver: TESTBASE };
            const date = new Date();
            const response = request
                .sendRequest(
                    methodus,
                    `${TESTBASE}/posts/:key1/:key2`,
                    [{ key1: 'value1', key2: 'value2' }, { key1: 'value1', key2: 'value2' }, [], { key1: date }, { user_id: 'id1' }],
                    [
                        { index: 0, from: 'params' },
                        { index: 1, from: 'body' },
                        { index: 2, from: 'files' },
                        { index: 3, from: 'query' },
                        { index: 4, name: 'secure', from: 'security_context' },
                    ]
                )
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json', security_context: '{"user_id":"id1"}' },
                method: 'post',
                timeout: 300000,
                data: {
                    key1: 'value1',
                    key2: 'value2',
                },
                url: `${TESTBASE}/posts/value1/value2?key1=${encodeURIComponent(date.toISOString())}`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });


        xit('test Request no name collection objects', async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();
            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:key1/:key2`, resolver: TESTBASE };
            const response = request
                .sendRequest(
                    methodus,
                    `${TESTBASE}/posts/:key1/:key2`,
                    [{ key1: 'value1', key2: 'value2' }, { key1: 'value1', key2: 'value2' }, [], { key1: 'value1', key2: 'value2' }, { user_id: 'id1' }],
                    [
                        { index: 0, from: 'params' },
                        { index: 1, from: 'body' },
                        { index: 2, from: 'files' },
                        { index: 3, from: 'query' },
                        { index: 4, name: 'secure', from: 'security_context' },
                    ]
                )
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json', security_context: '{"user_id":"id1"}' },
                method: 'post',
                timeout: 300000,
                data: {
                    key1: 'value1',
                    key2: 'value2',
                },
                url: `${TESTBASE}/posts/value1/value2?key1=value1&key2=value2`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });

        xit('test Request named collection objects', async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();
            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:key1/:key2`, resolver: TESTBASE };
            const response = request
                .sendRequest(
                    methodus,
                    `${TESTBASE}/posts/:key1/:key2`,
                    ['value1', 'value2', 'value1', 'value2', { user_id: 'id1' }],
                    [
                        { index: 0, from: 'params', name: 'key1' },
                        { index: 1, from: 'params', name: 'key2' },
                        { index: 2, from: 'query', name: 'key1' },
                        { index: 3, from: 'query', name: 'key2' },
                        { index: 4, from: 'body', name: 'formData' },
                    ]
                )
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                timeout: 300000,
                data: {
                    formData: {
                        user_id: 'id1',
                    },
                },
                url: `${TESTBASE}/posts/value1/value2?key1=value1&key2=value2`,
            });
            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });

        xit('test files', async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus = { verb: Verbs.Post, _auth: { type: AuthType.None }, route: `${TESTBASE}/posts/:key1/:key2`, resolver: TESTBASE };

            const response = request
                .sendRequest(
                    methodus,
                    `${TESTBASE}/posts/:key1/:key2`,
                    ['value1', 'value2', 'value1', 'value2', { user_id: 'id1' }],
                    [
                        { index: 0, from: 'params', name: 'key1' },
                        { index: 1, from: 'params', name: 'key2' },
                        { index: 2, from: 'query', name: 'key1' },
                        { index: 3, from: 'query', name: 'key2' },
                        { index: 4, from: 'body', name: 'formData' },
                    ]
                )
                .then(thenFn)
                .catch(catchFn);

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                timeout: 300000,
                data: {
                    formData: {
                        user_id: 'id1',
                    },
                },
                url: `${TESTBASE}/posts/value1/value2?key1=value1&key2=value2`,
            });
            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });
    });
});
