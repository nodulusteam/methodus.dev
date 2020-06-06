import { MethodConfig, Method, MethodResult } from '@methodus/server';
import { Verbs } from '@methodus/platform-express';

@MethodConfig('SingleControllerName')
export class SingleControllerName {

    @Method(Verbs.Get, '/user')
    public async getUser() {
        return new MethodResult({ name: 'user name' });
    }


}

