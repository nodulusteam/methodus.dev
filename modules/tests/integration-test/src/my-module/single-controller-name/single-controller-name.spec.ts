import injection from '@methodus/server/injection';
import { SingleControllerName } from './single-controller-name';

describe('SingleControllerName', () => {
    let controller: SingleControllerName;
    beforeAll(() => {        
        controller = injection.Injector.resolve<SingleControllerName>('SingleControllerName');
    })

    it.skip('Controller created', async () => {
        expect(controller).toBeDefined();
    });
});
