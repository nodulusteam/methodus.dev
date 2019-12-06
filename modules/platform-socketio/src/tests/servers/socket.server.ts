import {
    ServerConfiguration, RouterConfiguration, BuiltInTransports,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '@methodus/server';
import { TestController, TestTarget } from '../controllers/';
import { SocketIO } from '../../index';

/**
 * @hidden
 */
@ServerConfiguration(SocketIO, { port: process.env.PORT || 8020 })
@RouterConfiguration(TestController, ServerType.Socket)
@ClientConfiguration(TestTarget, BuiltInTransports.Socket, 'http://localhost:8020')
export class SocketTestServer extends ConfiguredServer {
    constructor() {
        super(SocketTestServer);
    }
}
