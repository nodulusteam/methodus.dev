process.env.test = 'true';
import decorators from '@methodus/framework-decorators';
import { ConfiguredServer } from '@methodus/server';
import { ExtressTestModule } from './express.module';
import { Express } from '../../index';
/**
 * @hidden
 */
@decorators.ServerConfiguration(Express, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@decorators.ModuleConfiguration(ExtressTestModule)
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


