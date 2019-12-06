

import {
    RouterConfiguration,
    ClientConfiguration, BuiltInTransports, Module, Injector
} from '@methodus/server';
import { ScreensDataController } from '../controllers/screen.data.controller';
import { TestTarget } from '../controllers/target.test';
import { TestController } from '../controllers/controller.test';
import { ProxiedController } from '../controllers/proxy.controller';
import { Express } from '../../index';

@Module()
@RouterConfiguration(Injector.get(ScreensDataController), Express)
@RouterConfiguration(TestController, Express)
@RouterConfiguration(ProxiedController, Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class ExtressTestModule {
    constructor() {

    }
}
