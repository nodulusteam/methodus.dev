import decorators from '@methodus/server/decorators';
import { ConfiguredServer } from '@methodus/server';
import { ExpressSessionTestModule } from './express-session.module';
import { Express, ExpressOptions } from '../../index';

const options: ExpressOptions = {
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


