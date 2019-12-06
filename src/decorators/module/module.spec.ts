import { Module } from './module';
import { TestTarget, TestController, ScreensDataController } from '../../tests/controllers/';
import {
    RouterConfiguration, ServerType,
    ClientConfiguration, BuiltInTransports, ConfiguredServer, ModuleConfiguration,
} from '../../tests/shim';
import { ProxiedController } from '../../tests/controllers/proxy.controller';

@Module()
@RouterConfiguration(TestController, ServerType.Express)
@RouterConfiguration(ScreensDataController, ServerType.Express)
@RouterConfiguration(ProxiedController, ServerType.Express)
// @PluginConfiguration('@methodus/describe')
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class ModuleClass {
    name: string;
    constructor() {
        this.name = 'ModuleClass';
    }
}

// @ServerConfiguration(Express, { port: process.env.PORT || 8020 })
@ModuleConfiguration(ModuleClass)
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressTestServer);
    }
}


describe('Module decorators', () => {
    it('Create module', () => {
        const module = new ModuleClass();
        expect(module).toBeDefined();
    });
});
