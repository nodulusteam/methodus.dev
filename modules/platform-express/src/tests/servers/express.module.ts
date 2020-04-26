

import {
    RouterConfiguration,
    ClientConfiguration, Module, Injector
} from '@methodus/server';

import { Http } from '@methodus/platform-rest';

import { ScreensDataController } from '../controllers/screen.data.controller';
import { TestTarget } from '../controllers/target.test';
import { TestController } from '../controllers/controller.test';
import { ProxiedController } from '../controllers/proxy.controller';
import { Express } from '../../index';

@Module()
@RouterConfiguration(Injector.get(ScreensDataController), Express)
@RouterConfiguration(TestController, Express)
@RouterConfiguration(ProxiedController, Express)
@ClientConfiguration(TestTarget, Http, 'https://localhost:8020')
export class ExtressTestModule {
    constructor() {

    }
}
