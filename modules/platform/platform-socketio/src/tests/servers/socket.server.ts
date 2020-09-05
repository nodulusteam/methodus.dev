import { ConfiguredServer } from '@methodus/server';
import decorators from '@methodus/server/decorators';
import { TestController, TestTarget } from '../controllers/';
import { SocketIO } from '../../index';

/**
 * @hidden
 */
@decorators.ServerConfiguration(SocketIO, { port: process.env.PORT || 8020 })
@decorators.RouterConfiguration(TestController, SocketIO)
@decorators.ClientConfiguration(TestTarget, SocketIO, 'http://localhost:8020')
export class SocketTestServer extends ConfiguredServer {
    constructor() {
        super(SocketTestServer);
    }
}
