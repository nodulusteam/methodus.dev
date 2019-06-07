process.env.test = 'true';
import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '../shim';
import { BuiltInServers, BuiltInTransports } from '../shim';
import { TestController, TestTarget, ScreensDataController } from '../controllers/';
import { ProxiedController } from '../controllers/proxy.controller';

/**
 * @ignore
 */
@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.Express)
@RouterConfiguration(ScreensDataController, ServerType.Express)
@RouterConfiguration(ProxiedController, ServerType.Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressTestServer);
    }
}
