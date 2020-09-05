import decorators from '@methodus/framework-decorators';
import { ConfiguredServer } from '@methodus/server';
import { Http } from '@methodus/platform-rest';
import { ExpressSessionTestModule } from './express-session.module';
import { Express, ExpressOptions } from '../../index';
import { TestTarget } from '../controllers/target.test';

const options: ExpressOptions = {
    port: process.env.PORT || 8031,
    secured: false,
    fileUpload: true,
    cors: false,
    session: {
        secret: 'mySecret',
        cookie: { maxAge: 60000 }
    }
}

@decorators.ServerConfiguration(Express, options)
@decorators.ModuleConfiguration(ExpressSessionTestModule)
@decorators.ClientConfiguration(TestTarget, Http, 'http://localhost:8031')
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


