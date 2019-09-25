process.env.test = 'true';
import { AsyncTest, Expect, TestFixture,  Timeout } from 'alsatian';
import { Mocker } from '../mocker';
import { TestController } from './controllers';
import { Injector } from './shim';

@TestFixture('Test additional method classes')
export class Units {

    
    @AsyncTest('TestController mock')
    @Timeout(1000 * 1000)
    public async mockTestController() {
        const testController = Injector.get(TestController);
        Mocker.mock(TestController);
        const mockResult = await testController.list('', '');
        Expect(mockResult).toBeDefined();
    }

    
    @AsyncTest('TestController mock for server')
    @Timeout(1000 * 1000)
    public async mockTestControllerForServer() {
        const testController = Injector.get(TestController);
        Mocker.mockServer(TestController);
        const mockResult = await testController.list('', '');
        Expect(mockResult).toBeDefined();
    }

}
