
import decorators from '@methodus/framework-decorators';
import injection from '@methodus/framework-decorators/injection';
import { TestTarget } from '../controllers/';
import { ConfiguredServer } from '../../server.configured';
 

/**
 * @hidden
 */
@decorators.ClientConfiguration(TestTarget, 'Http', 'https://jsonplaceholder.typicode.com')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();
    setTimeout(async () => {
        const result = await injection.Injector.get(TestTarget).list('aaaa', 'aaaa');
        console.log(result);
    }, 4000);
}
