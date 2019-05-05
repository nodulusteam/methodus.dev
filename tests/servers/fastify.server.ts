process.env.test = 'true';

import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '../../';
import { BuiltInServers, BuiltInTransports } from '../../src';
import { TestController, TestTarget } from '../controllers/';

@ServerConfiguration(BuiltInServers.HTTP2, { port: 8030 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.HTTP2)
@ClientConfiguration(TestTarget, BuiltInTransports.Http2, 'https://localhost:8030')
export class FastifyTestServer extends ConfiguredServer {
    constructor() {
        super(FastifyTestServer);
    }
}
