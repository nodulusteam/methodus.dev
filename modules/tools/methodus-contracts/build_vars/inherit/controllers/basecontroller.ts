
import { MethodConfigBase, MethodResult, Mapping } from '@methodus/server';
import { Mock } from '../';
import decorators from '@methodus/server/decorators';
import {Verbs} from '@methodus/platform-express';
@MethodConfigBase('BaseController')
export class BaseController {
    @decorators.MethodMock(Mock.simple)
    @decorators.Method(Verbs.Get, '/simple/get')
    public async get(@Mapping.Param('id') id: string, @Mapping.SecurityContext() _secure: any): Promise<MethodResult> {
        return new MethodResult({});
    }
}
