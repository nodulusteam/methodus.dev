
import {
    ClientConfiguration, ConfiguredServer,
} from '../shim';
import { Http } from '@methodus/platform-rest';
import { TestTarget } from '../controllers/';
import { Injector } from '../../di';

/**
 * @hidden
 */
@ClientConfiguration(TestTarget, Http, 'https://jsonplaceholder.typicode.com')
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
