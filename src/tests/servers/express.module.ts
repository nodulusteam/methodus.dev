process.env.test = 'true';
import {
    RouterConfiguration,
    ClientConfiguration,
} from '../shim';
import { BuiltInServers, BuiltInTransports, Module } from '../shim';
import { TestController, TestTarget, ScreensDataController } from '../controllers/';
import { ProxiedController } from '../controllers/proxy.controller';

@Module()
@RouterConfiguration(TestController, BuiltInServers.Express)
@RouterConfiguration(ScreensDataController, BuiltInServers.Express)
@RouterConfiguration(ProxiedController, BuiltInServers.Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class ExtressTestModule {
    constructor() {

    }
}
