
import {BuiltInTransports,
    ClientConfiguration, ConfiguredServer,
} from '../shim';
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
        const result = await TestTarget.list('aaaa', 'aaaa');
        console.log(result);
    }, 4000);
}
