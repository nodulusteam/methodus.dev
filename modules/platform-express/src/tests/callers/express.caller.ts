
import {Injector,
    BuiltInTransports,
    ClientConfiguration, ConfiguredServer,
} from '@methodus/server';
import { TestTarget } from '../controllers/';

/**
 * @hidden
 */
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8090')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();
    setTimeout(async () => {
        const result = await Injector.get(TestTarget).list('aaaa', 'aaaa');
        console.log(result);
    }, 4000);
}
