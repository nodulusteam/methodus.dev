import {
    ServerConfiguration, RouterConfiguration, ClientConfiguration,
    ConfiguredServer, PluginConfiguration,
} from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { Http } from '@methodus/platform-rest';

import { LocalController } from './controllers/local.controller';
import { RemoteService } from './controllers/remote.service';
@PluginConfiguration('@methodus/describe')
@ServerConfiguration(Express, { port: 6695 })
@RouterConfiguration(LocalController, Express)
@ClientConfiguration(RemoteService, Http, 'https://jsonplaceholder.typicode.com')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

(() => {
    return new Xserver();
})();
