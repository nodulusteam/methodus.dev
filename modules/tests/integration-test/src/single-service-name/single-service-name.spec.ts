import injection from '@methodus/server/injection';
import { SingleServiceName } from './single-service-name';

describe('SingleServiceName', () => {


    let service: SingleServiceName;
    beforeAll(() => {
        service = injection.Injector.resolve<SingleServiceName>('SingleServiceName');
    })

    it('Service created', async () => {
        expect(service).toBeDefined();
    });
});
