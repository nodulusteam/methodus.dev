// import {
//     RouterConfiguration,
//     ServerType,
//     ClientConfiguration,
//     ConfiguredServer,
//     ModuleConfiguration,
//     Module,
// } from '';

// import { ProxiedController } from '../../tests/controllers/proxy.controller';
// import { Injectable, Singleton } from '../decorators';
// import {
//     TestController,
//     ScreensDataController,
//     TestTarget,
// } from '../../tests/controllers';

// @Module()
// @RouterConfiguration(TestController, ServerType.Express)
// @RouterConfiguration(ScreensDataController, ServerType.Express)
// @RouterConfiguration(ProxiedController, ServerType.Express)
// @ClientConfiguration(TestTarget, {}, 'http://localhost:8040')
// export class ModuleClass {
//     name: string;
//     constructor() {
//         this.name = 'ModuleClass';
//     }
// }

// @Singleton()
// @Injectable()
// @ModuleConfiguration(ModuleClass)
// export class ExpressTestServer extends ConfiguredServer {
//     constructor() {
//         super();
//     }
// }
