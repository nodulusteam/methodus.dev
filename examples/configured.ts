process.env.test = 'true';

import {
    ServerConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType, PluginConfiguration,
} from '../';
import { ScreensDataController } from './controllers/screen.data.controller';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6695 })
@PluginConfiguration('@methodus/describe')
@ClientConfiguration(ScreensDataController, MethodType.Local, ServerType.Express)
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

new Xserver();
