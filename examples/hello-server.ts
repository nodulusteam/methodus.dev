import {
    ServerConfiguration, RouterConfiguration, PluginConfiguration,
    ClientConfiguration, ConfiguredServer,
} from '../';

import { DataController, RemoteController } from './controllers';
import { BuiltInServers, BuiltInTransports } from '..';
@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 6695 })
@PluginConfiguration('@methodus/describe')
@RouterConfiguration(DataController, BuiltInServers.Express)
@ClientConfiguration(RemoteController, BuiltInTransports.Http, 'http://localhost:6695')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

(() => {
    return new Xserver(); // start the server
})();
