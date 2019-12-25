process.env.test = 'true';

import { Mocker } from '../mocker';
import { TestController } from './controllers';
import { Injector } from './shim';

(async () => {
    const testController = Injector.get(TestController);
    Mocker.mockServer(TestController);
    const mockResult = await testController.list('', '');
    console.log(mockResult);
    return mockResult;
})()
