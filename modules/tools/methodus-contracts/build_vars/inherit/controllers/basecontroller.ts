
import { Method, MethodConfigBase, MethodResult, Verbs, Param, MethodMock, SecurityContext } from '@methodus/server';
import { Mock } from '../';

@MethodConfigBase('BaseController')
export class BaseController {
    @MethodMock(Mock.simple)
    @Method(Verbs.Get, '/simple/get')
    public async get(@Param('id') id: string, @SecurityContext() _secure: any): Promise<MethodResult> {
        return new MethodResult({});
    }
}
