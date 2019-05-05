process.env.test = 'true';
import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '../../';
import { BuiltInServers, BuiltInTransports } from '../../src';
import { TestController, TestTarget } from '../controllers/';

@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressTestServer);
    }
}
