import decorators from '@methodus/server/decorators';
import { SingleControllerName } from './single-controller-name/single-controller-name';
import { SingleServiceName } from './single-service-name/single-service-name';
import { Express } from '@methodus/platform-express';

@decorators.Module('MyModule')
@decorators.RouterConfiguration(SingleControllerName, Express)
export class MyModule {
    constructor() {

    }
    declarations = [SingleControllerName];
    providers = [SingleServiceName]
}
