
import {
    RouterConfiguration, ServerType,
    ClientConfiguration, ConfiguredServer, ModuleConfiguration,
    Module,
} from '../../tests/shim';
// import { Http } from '@methodus/platform-rest';

import { ProxiedController } from '../../tests/controllers/proxy.controller';
import { Injectable, Singleton } from '../decorators';
import { TestController, ScreensDataController, TestTarget } from '../../tests/controllers';


@Module()
@RouterConfiguration(TestController, ServerType.Express)
@RouterConfiguration(ScreensDataController, ServerType.Express)
@RouterConfiguration(ProxiedController, ServerType.Express)
// @PluginConfiguration('@methodus/describe')
@ClientConfiguration(TestTarget, {}, 'http://localhost:8040')
export class ModuleClass {
    name: string;
    constructor() {
        this.name = 'ModuleClass';
    }
}

@Singleton()
@Injectable()
//@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8040 })
@ModuleConfiguration(ModuleClass)
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super();
    }
}
