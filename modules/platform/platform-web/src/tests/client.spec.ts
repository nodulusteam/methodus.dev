const customGlobal: any = window as any;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

import { Injector, MethodResult, MethodType, Rest, MethodError } from '../lib';
import { TestContract } from './contracts';

Rest.intercept((req) => {
    return true;
});

(window as any).METHODUS_CONFIG = {
    'TestContract':
        { methodType: MethodType.Http }
};

Rest.intercept((data) => {
    return data;
})
describe('Call contract methods to activate the underlying transport', () => {
    test('MethodResult', () => {
        const result = new MethodResult({ ok: 1 }, 1, 1);
        expect(result.result.ok).toBe(1);
    });

    test('MethodError', () => {
        const result = new MethodError('There is an error', 400);
        expect(result.message).toBe('There is an error');
        try {
            throw new Error('An Error');
        } catch (error) {
            const resultError = new MethodError(error, 400);
            expect(result.message).toBe('There is an error');

        }
    });

    test('action1', async () => {
        const testContract = Injector.get<TestContract>(TestContract);
        customGlobal.fetch.mockResponseOnce(JSON.stringify({ status: 200, body: { 'ok': 1 } }));
        const result: any = await testContract.action1(1, 'test', 3, { item: 'xxxx' }, 'header-value');
        expect(result.body.ok).toBe(1);

        customGlobal.fetch.mockResponseOnce(JSON.stringify({ status: 200, body: { 'ok': 1 } }));
        const result2: any = await testContract.action1NoName({ item: 'xxx' }, 'test', 3, { item: 'xxxx' });
        expect(result2.body.ok).toBe(1);


        customGlobal.fetch.mockResponseOnce(JSON.stringify({ status: 200, body: { 'ok': 1 } }));
        const result3: any = await testContract.action1NoName({ item: ['xxxx', 'yyyy'] }, 'test', 3, { item: 'xxxx' });
        expect(result3.body.ok).toBe(1);


    });



    test('Using the local call', async () => {
        (window as any).METHODUS_CONFIG = {
            'TestContract':
                { methodType: MethodType.Local }
        };
        const testContract = Injector.get<TestContract>('TestContract');

        await testContract.action1(1, 'test', 3, { item: 'xxxx' }, 'header-value');
        await testContract.action4('test', 'localhost', 1);
        await testContract.action6('test', new Blob(), 1);

        const result: any = await testContract.action2(1, 'test', 3);
        expect(result.ok).toBe(1);
    });

    test('action2', async () => {
        (window as any).METHODUS_CONFIG = {
            'TestContract':
                { methodType: MethodType.Mock }
        };
        const testContract = Injector.get<TestContract>('TestContract');
        const result: any = await testContract.action2(1, 'test', 3);
        expect(result.ok).toBe(1);
    });

    test('action6', async () => {
        (window as any).METHODUS_CONFIG = {
            'TestContract':
                { methodType: MethodType.Http }
        };

        const testContract = Injector.get<TestContract>('TestContract');
        customGlobal.fetch.mockResponseOnce(JSON.stringify({ status: 200, body: { 'ok': 1 } }));
        const result: any = await testContract.action6('test', new Blob(), 1);
        expect(result.body.ok).toBe(1);
    });
});