process.env.test = 'true';
import {
    ServerConfiguration, RouterConfiguration, BuiltInServers, BuiltInTransports,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '../shim';
import { TestController, TestTarget } from '../controllers/';
/**
 * @hidden
 */
@ServerConfiguration(BuiltInServers.Socket, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.Socket)
@ClientConfiguration(TestTarget, BuiltInTransports.Socket, 'http://localhost:8020')
export class SocketTestServer extends ConfiguredServer {
    constructor() {
        super(SocketTestServer);
    }
}
