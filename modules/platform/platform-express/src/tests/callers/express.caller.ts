
import {
 
     ConfiguredServer,
} from '@methodus/server';
import { Http } from '@methodus/platform-rest';
import { TestTarget } from '../controllers';
import decorators from '@methodus/server/decorators';
import injection from '@methodus/server/injection';
/**
 * @hidden
 */
@decorators.ClientConfiguration(TestTarget, Http, 'http://localhost:8090')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();
    setTimeout(async () => {
        const result = await injection.Injector.get(TestTarget).list('aaaa', 'aaaa');
        return result;
    }, 4000);
}
