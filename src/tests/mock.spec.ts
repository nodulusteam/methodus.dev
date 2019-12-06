process.env.test = 'true';

import { Mocker } from '../mocker';
import { TestController } from './controllers';
import { Injector } from './shim';


describe('Test additional method classes', () => {
    it('TestController mock', async () => {

        const testController = Injector.get(TestController);
        Mocker.mock(TestController);
        const mockResult = await testController.list('', '');
        expect(mockResult).toBeDefined();
    });

    it('TestController mock for server', async () => {

        const testController = Injector.get(TestController);
        Mocker.mockServer(TestController);
        const mockResult = await testController.list('', '');
        expect(mockResult).toBeDefined();
    });

});