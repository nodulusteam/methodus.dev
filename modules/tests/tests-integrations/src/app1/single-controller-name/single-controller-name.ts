import { MethodResult } from '@methodus/framework-commons';
import decorators from '@methodus/framework-decorators';
import { Verbs } from '@methodus/platform-express';

@decorators.MethodConfig('SingleControllerName')
export class SingleControllerName {

    @decorators.Method(Verbs.Get, '/user')
    public async getUser() {
        return new MethodResult({ name: 'user name' });
    }


}

