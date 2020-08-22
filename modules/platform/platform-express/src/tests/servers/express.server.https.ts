process.env.test = 'true';
import decorators from '@methodus/framework-decorators';
import { ExtressTestModule } from './express.module';
import { Express } from '../../index';
import * as fs from 'fs';
import * as path from 'path';
import { ConfiguredServer } from '@methodus/server';
import { ExpressOptions } from '../../options';
import { TestTarget } from '../controllers/target.test';
import { Http } from '@methodus/platform-rest';



const options: ExpressOptions = {
    port: process.env.PORT || 8020,
    secured: true,
    key: fs.readFileSync(path.join(process.cwd(), './certs/key.txt')),
    cert: fs.readFileSync(path.join(process.cwd(), './certs/cert.txt')),
    passphrase: 'puravida',
    fileUpload: true,
    fileMaxSize: 10 * 1000,
    cors: true
}

/**
 * @hidden
 */
@decorators.ServerConfiguration(Express, options)
@decorators.PluginConfiguration('@methodus/describe')
@decorators.ModuleConfiguration(ExtressTestModule)
@decorators.ClientConfiguration(TestTarget, Http, 'https://localhost:8020')
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


