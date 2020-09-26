import decorators from '@methodus/server/decorators';
import { SingleControllerName } from './single-controller-name/single-controller-name';
@decorators.Module('MyModule')
export class MyModule {
    constructor() {

    }

    declarations = [SingleControllerName];
}
