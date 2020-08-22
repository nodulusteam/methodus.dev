import {
      ConfiguredServer,
} from '@methodus/server';

import decorators from '@methodus/framework-decorators';

import { Express } from '@methodus/platform-express';
import { Http } from '@methodus/platform-rest';
import * as path from 'path';
import { TestController, TestTarget } from '../controllers/';
import { ProxiedController } from '../controllers/proxy.controller';
import { CopyController } from '../controllers/controller.copy';

@decorators.ServerConfiguration(Express, { port: process.env.PORT || 8020 })
@decorators.PluginConfiguration(path.join(__dirname, '../../index'), { path: '/describe' })
@decorators.RouterConfiguration(TestController, Express)
@decorators.RouterConfiguration(CopyController, Express)
@decorators.RouterConfiguration(ProxiedController, Express)
@decorators.ClientConfiguration(TestTarget, Http, `https://jsonplaceholder.typicode.com`)
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressTestServer);
    }
}
