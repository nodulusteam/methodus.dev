 

import { Injector, MethodType } from '../';
import { SocketController } from './contracts';
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var mock = new MockAdapter(axios);

(window as any).METHODUS_CONFIG = {
    'SocketController':
        { methodType: MethodType.Socket }
};


describe('Call SocketController', () => {
    test('SocketController', async () => {
        (window as any).io = () => {
            return {
                connect: () => {
                    return {
                        emit: () => {
                            return true;
                        }
                    };
                }
            };
        };

        const testContract = Injector.get<SocketController>(SocketController);
        mock.onPost("/posts/noname/?item=xxx").reply(200,
            { 'ok': 1 }
          );
        const result: any = await testContract.connect({});
        expect(result.io).toBeDefined();
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