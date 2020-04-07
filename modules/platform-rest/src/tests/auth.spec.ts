import mockAxios from 'jest-mock-axios';
import { WebRequest } from '../web-request';
import { Verbs, MethodusObject } from '../interfaces';
import { AuthType } from '@methodus/server';


const TESTBASE = 'http://jsonplaceholder.typicode.com';

describe('Web request tests for platform-rest', () => {

    jest.setTimeout(1000 * 30);
    afterEach(() => {
        mockAxios.reset();
    });

    describe('Test Auth options', () => {
        xit(`Simple Get request, Basic auth, ${TESTBASE}/posts`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus = {
                verb: Verbs.Get, _auth: { type: AuthType.Basic, options: { user: 'roi', password: '1234' } },
                route: `${TESTBASE}/posts`, resolver: TESTBASE
            };
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
                'auth': {
                    'password': '1234',
                    'username': 'roi',
                },
                timeout: 300000,
                url: `${TESTBASE}/posts`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });


        it(`Simple Get request, BearerToken auth, ${TESTBASE}/posts`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus: MethodusObject = {
                verb: Verbs.Get, _auth: {
                    type: AuthType.BearerToken,
                    options: async function () { return new Promise(function (resolve) { resolve('token') }) }
                },
                route: `${TESTBASE}/posts`, resolver: TESTBASE
            };
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

    });


});
