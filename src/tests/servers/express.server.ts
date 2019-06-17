process.env.test = 'true';
import {
    ServerConfiguration,
    ConfiguredServer,
} from '../shim';
import { BuiltInServers } from '../shim';
import { ModuleConfiguration } from '../../decorators';
import { ExtressTestModule } from './express.module';

/**
 * @hidden
 */
@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@ModuleConfiguration(ExtressTestModule)
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressTestServer);
    }
}
(() => {
    if (process.env.TESTMODE === 'run') {
        return new ExpressTestServer();
    }
    return;
})();


