import decorators from '@methodus/framework-decorators';
import { Mapping, MethodResult } from '@methodus/framework-commons';
import { Verbs } from '@methodus/platform-express';
import { BaseController } from './controller.base';
import { UserModel } from '../models/user.model';

@decorators.MethodConfig('TestController', [], '/api/player')
export class TestController extends BaseController {

    @decorators.Method(Verbs.Put, '/')
    public async update(@Mapping.Body('user', UserModel) user: UserModel) {
        return new MethodResult({});
    }


    @decorators.Method(Verbs.Post, '/')
    public async create(@Mapping.Body('user', UserModel) user: UserModel) {

        console.log(user);
        return new MethodResult(user);
    }




    @decorators.Method(Verbs.Delete, '/:id')
    public async delete(@Mapping.Param('id') id: string) {
        return new MethodResult(id);
    }

}
