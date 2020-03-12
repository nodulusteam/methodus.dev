import mockAxios from 'jest-mock-axios';
import { WebRequest } from '../web-request';
import { Verbs } from '../verbs';

const TESTBASE = 'http://jsonplaceholder.typicode.com';

describe('Web request', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe('Test all verbs', () => {
        let catchFn = jest.fn(),
            thenFn = jest.fn();

        it('Get list', () => {
            const request = new WebRequest();
            request
                .sendRequest(Verbs.Get, `${TESTBASE}/posts`, [], [])
                .then(thenFn)
                .catch(catchFn);

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'get',
                timeout: 300000,
                url: `${TESTBASE}/posts`,
            });
            // console.log(resultx);
            // expect(resultx.data.length === 100).toBeTruthy();
        });

        it('Get one', () => {
            const request = new WebRequest();
            request
                .sendRequest(Verbs.Get, `${TESTBASE}/posts/:postid`, [1], [{ index: 0, name: 'postid', from: 'params' }])
                .then(thenFn)
                .catch(catchFn);

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'get',
                timeout: 300000,
                url: `${TESTBASE}/posts/1`,
            });
        });

        it('Post', () => {
            const request = new WebRequest();
            request
                .sendRequest(Verbs.Post, `${TESTBASE}/posts/`, [{ id: 1, userid: 1 }], [{ index: 0, from: 'body' }])
                .then(thenFn)
                .catch(catchFn);

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
        });

        it('Put', async () => {
            const request = new WebRequest();
            request
                .sendRequest(
                    Verbs.Put,
                    `${TESTBASE}/posts/:postid`,
                    [1, { id: 1, userid: 1 }],
                    [
                        { index: 0, name: 'postid', from: 'params' },
                        { index: 1, from: 'body' },
                    ]
                )
                .then(thenFn)
                .catch(catchFn);

            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: { 'Content-Type': 'application/json' },
                method: 'put',
                timeout: 300000,
                data: {
                    id: 1,
                    userid: 1,
                },
                url: `${TESTBASE}/posts/1`,
            });
        });
    });

    describe('Test arguments collections', () => {
        let catchFn = jest.fn(),
            thenFn = jest.fn();

        it('test Request no name collection objects', async () => {
            const request = new WebRequest();
            request
                .sendRequest(
                    Verbs.Post,
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
        });

        it('test Request named collection objects', () => {
            const request = new WebRequest();
            request
                .sendRequest(
                    Verbs.Post,
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
        });



        it('test files', () => {
            const request = new WebRequest();
            request
                .sendRequest(
                    Verbs.Post,
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
        });
    });
});
