process.env.test = 'true';
import * as path from 'path';

import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType, PluginConfiguration, TransportType,
} from '../../';
import { BuiltInServers, BuiltInTransports } from '../../src';
import { TestController } from '../controller.test';
import { TestTarget } from '../target.test';

@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8020 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(TestController, ServerType.Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

if (process.env.TESTMODE === 'run') {
    new Xserver();

}
