import {
    Module,
    ServerConfiguration,
    ConfiguredServer,
    RouterConfiguration,
} from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { SingleControllerName } from './single-controller-name/single-controller-name';
import { SingleServiceName } from "./single-service-name/single-service-name";
import { MyModule } from "./my-module/my-module";

@Module('AppModule')
@ServerConfiguration(Express, { port: 3060 })
@RouterConfiguration(SingleControllerName, Express)
export class AppModule extends ConfiguredServer {  
    declarations = [SingleControllerName];
    providers = [SingleServiceName];
    imports = [MyModule];
}
