import {
    ServerConfiguration, RouterConfiguration, PluginConfiguration,
    ClientConfiguration, ConfiguredServer,
} from '../';

import { ScreensDataController } from './controllers/screen.data.controller';
import { BuiltInServers, BuiltInTransports } from '../src';
@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 6695 })
@PluginConfiguration('@methodus/describe')
@RouterConfiguration(ScreensDataController, BuiltInServers.Express)
@ClientConfiguration(ScreensDataController, BuiltInTransports.Http, 'http://localhost:6695')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

new Xserver();
