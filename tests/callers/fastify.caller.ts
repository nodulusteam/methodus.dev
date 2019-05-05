
import {
    ClientConfiguration, ConfiguredServer,
} from '../../';
import { BuiltInTransports } from '../../src';
import { TestTarget } from '../controllers/';

@ClientConfiguration(TestTarget, BuiltInTransports.Http2, 'https://localhost:8030')
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
