import decorators from '@methodus/server/decorators';
import { ConfiguredServer } from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { MyModule } from './my-module/my-module';

@decorators.ServerConfiguration(Express, { port: 3060 })
export class AppModule extends ConfiguredServer {
    constructor() {
        super();
    }
    imports = [MyModule];
}
