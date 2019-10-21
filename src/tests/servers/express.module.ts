process.env.test = 'true';
import {
    RouterConfiguration,
    ClientConfiguration,
} from '../shim';
import { BuiltInServers, BuiltInTransports, Module, Injector } from '../shim';
import { ScreensDataController } from '../controllers/screen.data.controller';
import { TestTarget } from '../controllers/target.test';
import { TestController } from '../controllers/controller.test';
import { ProxiedController } from '../controllers/proxy.controller';

@Module()
@RouterConfiguration(Injector.get(ScreensDataController), BuiltInServers.Express)
@RouterConfiguration(TestController, BuiltInServers.Express)
@RouterConfiguration(ProxiedController, BuiltInServers.Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class ExtressTestModule {
    constructor() {

    }
}
