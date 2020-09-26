import { Injector } from '@methodus/server';
import { SingleServiceName } from './single-service-name';

describe('SingleServiceName', () => {

     
    let service: SingleServiceName;
    beforeAll(() => {        
        service = Injector.get(SingleServiceName);
    })

    it('Service created', async () => {
        expect(service).toBeDefined();
    });
});
