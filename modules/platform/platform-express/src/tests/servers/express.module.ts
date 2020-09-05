import injection from '@methodus/server/injection';
import decorators from '@methodus/server/decorators';
import { MethodHandler, MethodPipeHandler } from '@methodus/server';
import { Express } from '../../index';
import { ScreensDataController } from '../controllers/screen.data.controller';
import { TestController } from '../controllers/controller.test';
import { ProxiedController } from '../controllers/proxy.controller';

new MethodHandler();
new MethodPipeHandler();
@decorators.Module()
@decorators.RouterConfiguration(injection.Injector.get(ScreensDataController), Express)
@decorators.RouterConfiguration(TestController, Express)
@decorators.RouterConfiguration(ProxiedController, Express)
export class ExpressTestModule {
    constructor() {

    }
}
