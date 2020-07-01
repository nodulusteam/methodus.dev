const customGlobal: any = window as any;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
import { Injector } from '../lib';
import { MethodResult, MethodType, Rest, MethodError } from '../lib';
import { TestContract, ExtendTestContract } from './contracts';


Rest.intercept((req) => {
    return true;
});



// const fetchMock = require('fetch-mock');
// fetchMock.config.sendAsJson = true;

(window as any).METHODUS_CONFIG = {
    'ExtendTestContract':
        { methodType: MethodType.Http }
};


describe('Call using inherit controllers', () => {
    test('ExtendTestContract', async () => {
        const testContract = Injector.get<ExtendTestContract>(ExtendTestContract);
        customGlobal.fetch.mockResponseOnce(JSON.stringify({ status: 200, body: { 'ok': 1 } }));
        const result: any = await testContract.baseAction(1, 'test');
        expect(result.body.ok).toBe(1);
    });
});



//     it('BaseTestContract.action1', async () => {

//         (window as any).METHODUS_CONFIG = {
//             'TestContract':
//                 { methodType: MethodType.Mock }
//         };
//         const testContract = Injector.get(TestContract);
//         fetchMock.get('http://localhost:9876/posts/5/test', { status: 200, body: { 'ok': 1 } });
//         const result: any = await testContract.action1(5, 'test');
//         expect(result.ok).to.equal(1);
//     });


// });