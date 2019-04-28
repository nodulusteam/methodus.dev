process.env.test = 'true';
import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '../../';
import { BuiltInServers, BuiltInTransports } from '../../src';
import { TestController } from '../controllers/controller.test';
import { TestTarget } from '../controllers/target.test';

@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();
}
