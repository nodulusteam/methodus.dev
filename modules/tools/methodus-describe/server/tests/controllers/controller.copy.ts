import decorators from '@methodus/framework-decorators';
import { Mapping, MethodResult } from '@methodus/framework-commons';
import { Verbs } from '@methodus/platform-express';
import { BaseController } from './controller.base';


const basicAuth = require('express-basic-auth');

const authMiddlware = basicAuth({
    users: { 'admin': 'supersecret' }
})



@decorators.MethodConfig('CopyController', [authMiddlware], '/api')
export class CopyController extends BaseController {

    @decorators.Method(Verbs.Put, '/posts')
    public async update() {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Delete, '/posts/:id')
    public async delete(@Mapping.Param('id') id: string) {
        return new MethodResult(id);
    }

}
