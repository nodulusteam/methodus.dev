import { Test, Expect, TestFixture, Timeout } from 'alsatian';
import { Module } from './module';
import { TestTarget, TestController, ScreensDataController } from '../../tests/controllers/';
import {
    BuiltInServers, RouterConfiguration, ServerConfiguration, ServerType,
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

@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8020 })
@ModuleConfiguration(ModuleClass)
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressTestServer);
    }
}




@TestFixture('Module decorators')
export class ModulesTest {
    @Test('Create module')
    @Timeout(1000 * 1000)
    public async createModule() {
        const module = new ModuleClass();
        Expect(module).toBeDefined();
    }

}
