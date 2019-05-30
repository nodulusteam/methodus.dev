process.env.test = 'true';
import { AsyncTest, Expect, TestFixture,  Timeout } from 'alsatian';
import { Mocker } from '../mocker';
import { TestController } from './controllers';

@TestFixture('Test additional method classes')
export class Units {

    
    @AsyncTest('TestController mock')
    @Timeout(1000 * 1000)
    public async mockTestController() {
        Mocker.mock(TestController);
        const mockResult = await TestController.list('', '');
        Expect(mockResult).toBeDefined();
    }

    
    @AsyncTest('TestController mock for server')
    @Timeout(1000 * 1000)
    public async mockTestControllerForServer() {
        Mocker.mockServer(TestController);
        const mockResult = await TestController.list('', '');
        Expect(mockResult).toBeDefined();
    }

}
