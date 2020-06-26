import {
    ConfiguredServer,
} from '@methodus/server';
import decorators from '@methodus/framework-decorators';
import { Express } from '@methodus/platform-express';
import { SingleControllerName } from './single-controller-name/single-controller-name';
import { SingleServiceName } from "./single-service-name/single-service-name";
import { MyModule } from "./my-module/my-module";

@decorators.Module('AppModule')
@decorators.ServerConfiguration(Express, { port: 3060 })
@decorators.RouterConfiguration(SingleControllerName, Express)
export class AppModule extends ConfiguredServer {
    declarations = [SingleControllerName];
    providers = [SingleServiceName];
    imports = [MyModule];
}
