process.env.test = 'true';
import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '../../';
import { BuiltInServers, BuiltInTransports } from '../../src';
import { TestController, TestTarget } from '../controllers/';

@ServerConfiguration(BuiltInServers.Socket, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.Socket)
@ClientConfiguration(TestTarget, BuiltInTransports.Socket, 'http://localhost:8020')
export class SocketTestServer extends ConfiguredServer {
    constructor() {
        super(SocketTestServer);
    }
}
