import * as path from 'path';

import {
    ServerConfiguration, RouterConfiguration, ClientConfiguration,
    ConfiguredServer, PluginConfiguration,
} from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { Http } from '@methodus/platform-rest';
import { LocalController } from './controllers/local.controller';
import { RemoteService } from './controllers/remote.service';

@PluginConfiguration(path.join(__dirname, './static'), { path: '/', clientPath: '../public' })
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
