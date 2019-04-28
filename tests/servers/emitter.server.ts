process.env.test = 'true';
import * as path from 'path';

import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer,
} from '../../';
import { TestController } from '../controllers/controller.test';
import { TestTarget } from '../controllers/target.test';

class ServerPlugin {
    static serverName = 'custom';
    static path = path.join(process.cwd(), 'tests', 'servers', 'emitter.plugin');
}

@ServerConfiguration(ServerPlugin, {})
@RouterConfiguration(TestController, 'ServerPlugin')
@ClientConfiguration(TestTarget, ServerPlugin)
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();
}
