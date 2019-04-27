process.env.test = 'true';
import * as path from 'path';

import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType, PluginConfiguration, TransportType,
} from '../../';
import { BuiltInServers, BuiltInTransports } from '../../src';
import { TestController } from '../controller.test';
import { TestTarget } from '../target.test';

@ServerConfiguration(BuiltInServers.HTTP2, { port: 8021 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.HTTP2)
@ClientConfiguration(TestTarget, BuiltInTransports.Http2, 'https://localhost:8021')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();

}
