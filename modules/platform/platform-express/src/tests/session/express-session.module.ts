import decorators from '@methodus/framework-decorators';
import { MethodHandler, MethodPipeHandler } from '@methodus/server';
import { Express } from '../../index';
import { SessionController } from './session.controller';

new MethodHandler();
new MethodPipeHandler();

@decorators.Module('ExpressSessionTestModule')
@decorators.RouterConfiguration(SessionController, Express)
export class ExpressSessionTestModule {
    constructor() {

    }
}
