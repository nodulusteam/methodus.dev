process.env.test = 'true';
import * as path from 'path';

import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType, PluginConfiguration, TransportType,
} from '../';
import { ScreensDataController } from './controllers/screen.data.controller';
import { BuiltInServers, BuiltInTransports } from '../src';

const expressModule = path.join(process.cwd(), '/src/servers/express');

@ServerConfiguration(BuiltInServers.Express, { path: expressModule, port: process.env.PORT || 6695 })
// @PluginConfiguration('@methodus/describe')
@RouterConfiguration(ScreensDataController, ServerType.Express)
@ClientConfiguration(ScreensDataController, BuiltInTransports.Http, 'http://localhost:6695')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

new Xserver();
