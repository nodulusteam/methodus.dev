process.env.test = 'true';
import {
    ModuleConfiguration,
    ServerConfiguration,     
    PluginConfiguration,
} from '@methodus/framework-decorators';
import { ExtressTestModule } from './express.module';
import { Express } from '../../index';
import * as fs from 'fs';
import * as path from 'path';
import { ConfiguredServer } from '@methodus/server';




const options = {
    port: process.env.PORT || 8020,
    secured: true,
    key: fs.readFileSync(path.join(process.cwd(), './certs/key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), './certs/cert.pem')),
    passphrase: 'puravida',
}

/**
 * @hidden
 */
@ServerConfiguration(Express, options)
@PluginConfiguration('@methodus/describe')
@ModuleConfiguration(ExtressTestModule)
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


