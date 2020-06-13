import { injectionModule as injection } from '@methodus/server';
import { RouterConfiguration, Module, ClientConfiguration } from '@methodus/framework-decorators';
import { MethodHandler } from '@methodus/server';
import { Express } from '../../index';
import { ScreensDataController } from '../controllers/screen.data.controller';
import { TestController } from '../controllers/controller.test';
import { ProxiedController } from '../controllers/proxy.controller';
import { TestTarget } from '../controllers/target.test';
import { Http } from '@methodus/platform-rest';
new MethodHandler();
@Module()
@RouterConfiguration(injection.Injector.get(ScreensDataController), Express)
@RouterConfiguration(TestController, Express)
@RouterConfiguration(ProxiedController, Express)
@ClientConfiguration(TestTarget, Http, 'https://localhost:8020')
export class ExtressTestModule {
    constructor() {

    }
}
