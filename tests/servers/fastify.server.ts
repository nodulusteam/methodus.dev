process.env.test = 'true';

import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '../../';
import { BuiltInServers, BuiltInTransports } from '../../src';
import { TestController } from '../controllers/controller.test';
import { TestTarget } from '../controllers/target.test';

@ServerConfiguration(BuiltInServers.HTTP2, { port: 8021 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.HTTP2)
@ClientConfiguration(TestTarget, BuiltInTransports.Http2, 'https://localhost:8021')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();

}
