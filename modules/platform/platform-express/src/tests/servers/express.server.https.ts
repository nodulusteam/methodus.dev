process.env.test = 'true';
import decorators from '@methodus/framework-decorators';
import { ExtressTestModule } from './express.module';
import { Express } from '../../index';
import * as fs from 'fs';
import * as path from 'path';
import { ConfiguredServer } from '@methodus/server';




const options = {
    port: process.env.PORT || 8020,
    secured: true,
    key: fs.readFileSync(path.join(process.cwd(), './certs/key.txt')),
    cert: fs.readFileSync(path.join(process.cwd(), './certs/cert.txt')),
    passphrase: 'puravida',
}

/**
 * @hidden
 */
@decorators.ServerConfiguration(Express, options)
@decorators.PluginConfiguration('@methodus/describe')
@decorators.ModuleConfiguration(ExtressTestModule)
export class ExpressSecuredTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressSecuredTestServer);
    }
}
(() => {
    if (process.env.TESTMODE === 'run') {
        return new ExpressSecuredTestServer();
    }
    return;
})();


