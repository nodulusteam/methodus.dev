import {
    Module,
    ServerConfiguration,
    ConfiguredServer,
} from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { SingleControllerName } from './single-controller-name/single-controller-name';
import { SingleServiceName } from "./single-service-name/single-service-name";
import { MyModule } from "./my-module/my-module";

@Module('AppModule')
@ServerConfiguration(Express, { port: 3060 })
export class AppModule extends ConfiguredServer {
    constructor() {
        super(AppModule);
    }

    declarations = [SingleControllerName];
    providers = [SingleServiceName];
    imports = [MyModule];
}
