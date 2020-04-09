import { Injector } from '@methodus/server';
import { SingleControllerName } from './single-controller-name';

describe('SingleControllerName', () => {

     
    let controller: SingleControllerName;
    beforeAll(() => {        
        controller = Injector.get(SingleControllerName);
    })

    it('Controller created', async () => {
        expect(controller).toBeDefined();
    });
});
