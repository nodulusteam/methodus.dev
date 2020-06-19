// import { Module } from './module';
// import { TestTarget, TestController, ScreensDataController } from '@methodus/framework-integrations';
// import { ServerType } from '@methodus/server';
// import {
//     RouterConfiguration,
//     ClientConfiguration, ConfiguredServer, ModuleConfiguration,
// } from '../index';
// import { ProxiedController } from '@methodus/framework-integrations';
// // import { Http } from '@methodus/platform-rest';

import { Module } from './module';

@Module()
export class ModuleClass {
    name: string;
    constructor() {
        this.name = 'ModuleClass';
    }
}

// // @ServerConfiguration(Express, { port: process.env.PORT || 8020 })
// @ModuleConfiguration(ModuleClass)
// export class ExpressTestServer extends ConfiguredServer {
//     constructor() {
//         super(ExpressTestServer);
//     }
// }

describe('Module decorators', () => {
    it('Create module', () => {
        const module = new ModuleClass();
        expect(module).toBeDefined();
    });
});
