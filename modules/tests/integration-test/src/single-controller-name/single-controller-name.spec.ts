import injection from '@methodus/server/injection';
import { SingleControllerName } from './single-controller-name';

describe('SingleControllerName', () => {

     
    let controller: SingleControllerName;
    beforeAll(() => {        
        controller = injection.Injector.get(SingleControllerName);
    })

    it('Server created', async () => {
        expect(controller).toBeDefined();
    });
});
