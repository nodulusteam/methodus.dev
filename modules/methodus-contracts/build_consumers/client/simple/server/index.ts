
import {
    ServerConfiguration, PluginConfiguration,
    ConfiguredServer, ServerType, MethodType, ClientConfiguration,
} from '@methodus/server';
import * as path from 'path';

import { Simple } from '@server-contracts/simple';
@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6690 })
@ClientConfiguration(Simple, MethodType.Mock, ServerType.Express)
@PluginConfiguration(path.join(__dirname, 'static'), { path: '/' })
class SetupServer extends ConfiguredServer {
    constructor() {
        super(SetupServer);
    }
}

// tslint:disable-next-line:no-unused-expression
new SetupServer();
