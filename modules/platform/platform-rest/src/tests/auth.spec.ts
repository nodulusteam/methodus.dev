import mockAxios from 'jest-mock-axios';
import { WebRequest } from '../web-request';
import { Verbs, MethodusObject } from '../interfaces';
import { AuthType } from '@methodus/framework-commons';

const TESTBASE = 'http://jsonplaceholder.typicode.com';

describe('Web request tests for platform-rest', () => {
    jest.setTimeout(1000 * 30);
    afterEach(() => {
        mockAxios.reset();
    });

    describe('Test Auth options', () => {
        it(`Simple Get request, Basic auth user:password, ${TESTBASE}/posts`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus = {
                verb: Verbs.Get,
                _auth: { type: AuthType.Basic, options: { user: 'roi', password: '1234' } },
                route: `${TESTBASE}/posts`,
                resolver: TESTBASE,
            };
            await request.sendRequest(methodus, `${TESTBASE}/posts`, [], []).then(thenFn).catch(catchFn);
            const response = request.send();
            mockAxios.mockResponse({ status: 200, data: { key: 2 } });
            await response;

            expect(mockAxios.request).toHaveBeenCalledTimes(1);
            expect(mockAxios.request).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    headers: {
                        // 'Content-Type': 'application/json',
                        Authorization: 'Basic cm9pOjEyMzQ=',
                    },
                    method: 'get',
                    timeout: 300000,
                    url: `${TESTBASE}/posts`,
                })
            );

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });

        it(`Simple Get request, Basic auth using Base64 string, ${TESTBASE}/posts`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus = {
                verb: Verbs.Get,
                _auth: { type: AuthType.Basic, options: { token: 'cm9pOjEyMzQ=' } },
                route: `${TESTBASE}/posts`,
                resolver: TESTBASE,
            };
            await request.sendRequest(methodus, `${TESTBASE}/posts`, [], []).then(thenFn).catch(catchFn);
            const response = request.send();
            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledTimes(1);
            expect(mockAxios.request).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    headers: {
                        //'Content-Type': 'application/json',
                        Authorization: 'Basic cm9pOjEyMzQ=',
                    },
                    method: 'get',
                    timeout: 300000,
                    url: `${TESTBASE}/posts`,
                })
            );

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });
        it(`Simple Get request, Basic auth using a function to generate credentials, ${TESTBASE}/posts`, async () => {
            let catchFn = jest.fn(),
                thenFn = jest.fn();

            const request = new WebRequest();
            const methodus: MethodusObject = {
                verb: Verbs.Get,
                _auth: {
                    type: AuthType.Basic,
                    // options: { token: 'token' }
                    options: () => {
                        return 'cm9pOjEyMzQ';
                    },
                },
                route: `${TESTBASE}/posts`,
                resolver: TESTBASE,
            };
            await request.sendRequest(methodus, `${TESTBASE}/posts`, [], []).then(thenFn).catch(catchFn);
            const response = request.send();
            mockAxios.mockResponse({ status: 200, data: { key: 2 } });

            await response;

            expect(mockAxios.request).toHaveBeenCalledTimes(1);
            expect(mockAxios.request).toHaveBeenCalledWith({
                headers: {
                    Authorization: 'cm9pOjEyMzQ',
                },
                method: 'get',
                timeout: 300000,
                url: `${TESTBASE}/posts`,
            });

            expect(thenFn).toHaveBeenCalledTimes(1);
            expect(catchFn).toHaveBeenCalledTimes(0);
        });
    });

    xit(`Simple Get request, BearerToken auth, ${TESTBASE}/posts`, async () => {
        let catchFn = jest.fn(),
            thenFn = jest.fn();

        const request = new WebRequest();
        const methodus: MethodusObject = {
            verb: Verbs.Get,
            _auth: {
                type: AuthType.BearerToken,
                // options: { token: 'token' }
                options: async () => {
                    return 'token';
                },
            },
            route: `${TESTBASE}/posts`,
            resolver: TESTBASE,
        };
        const response = request.sendRequest(methodus, `${TESTBASE}/posts`, [], []).then(thenFn).catch(catchFn);

        mockAxios.mockResponse({ status: 200, data: { key: 2 } });

        await response;

        expect(mockAxios.request).toHaveBeenCalledTimes(1);
        expect(mockAxios.request).toHaveBeenCalledWith({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token',
            },
            method: 'get',
            timeout: 300000,
            url: `${TESTBASE}/posts`,
        });

        expect(thenFn).toHaveBeenCalledTimes(1);
        expect(catchFn).toHaveBeenCalledTimes(0);
    });
});
