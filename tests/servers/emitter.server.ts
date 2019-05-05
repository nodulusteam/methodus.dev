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
export class EmitterTestServer extends ConfiguredServer {
    constructor() {
        super(EmitterTestServer);
    }
}
