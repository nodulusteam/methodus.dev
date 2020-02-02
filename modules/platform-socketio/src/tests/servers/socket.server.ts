import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer,
} from '@methodus/server';
import { TestController, TestTarget } from '../controllers/';
import { SocketIO } from '../../index';

/**
 * @hidden
 */
@ServerConfiguration(SocketIO, { port: process.env.PORT || 8020 })
@RouterConfiguration(TestController, SocketIO)
@ClientConfiguration(TestTarget, SocketIO, 'http://localhost:8020')
export class SocketTestServer extends ConfiguredServer {
    constructor() {
        super(SocketTestServer);
    }
}
