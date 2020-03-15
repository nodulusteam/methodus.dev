import mockAxios from 'jest-mock-axios';
import { WebRequest } from '../web-request';
import { Verbs } from '../verbs';

const TESTBASE = 'http://jsonplaceholder.typicode.com';

describe('Web request', () => {
    // var axios = require('axios');
    // var MockAdapter = require('axios-mock-adapter');

    // This sets the mock adapter on the default instance
    //  var mockerApi = new MockAdapter(axios);

    jest.setTimeout(1000 * 30);
    afterEach(() => {
        mockAxios.reset();
    });

    describe('Test all verbs', () => {
        

        it('Get list', async () => {
            let catchFn = jest.fn(),
            thenFn = jest.fn();
            const request = new WebRequest();
            const response = request
                .sendRequest(Verbs.Get, `${TESTBASE}/posts`, [], [])
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

        it('Get one', async () => {
            const request = new WebRequest();
            let catchFn = jest.fn(),
            thenFn = jest.fn();
            const response = request
                .sendRequest(Verbs.Get, `${TESTBASE}/posts/:postid`, [1], [{ index: 0, name: 'postid', from: 'params' }])
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

        it('Post', async () => {
            let catchFn = jest.fn(),
            thenFn = jest.fn();
            const request = new WebRequest();
            const response = request
                .sendRequest(Verbs.Post, `${TESTBASE}/posts/`, [{ id: 1, userid: 1 }], [{ index: 0, from: 'body' }])
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

        it('Put', async () => {
            let catchFn = jest.fn(),
            thenFn = jest.fn();
            const request = new WebRequest();
            const response = request
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

            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

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

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });
    });

    describe('Test arguments collections', () => {
        

        it('test Request no name collection objects', async () => {
            let catchFn = jest.fn(),
            thenFn = jest.fn();
            const request = new WebRequest();
            const response = request
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

        it('test Request named collection objects', async () => {
            let catchFn = jest.fn(),
            thenFn = jest.fn();
            const request = new WebRequest();
            const response = request
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

        it('test files', async () => {
            let catchFn = jest.fn(),
            thenFn = jest.fn();

            const request = new WebRequest();
            const response = request
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
