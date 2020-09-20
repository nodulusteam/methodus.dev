import decorators from '@methodus/server/decorators';
import { Mapping, MethodResult } from '@methodus/framework-commons';
import { Verbs } from '@methodus/platform-express';
import { Mock } from '../mocks/mock';

@decorators.MethodConfig('Simple')
export class Simple {
    private async _simplyPrivate(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({ Name: 'roi' });
    }
    @decorators.MethodMock(Mock.simple)
    @decorators.Method(Verbs.Get, '/simple/get')
    public async get(@Mapping.Param('id') id: string, @Mapping.SecurityContext() user: any): Promise<MethodResult<any>> {
        // some comments        
        return new MethodResult({ Name: 'roi' });
        // some othe comments
    }

    @decorators.Method(Verbs.Post, '/simple/post')
    public async post(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({ Name: 'roi' });
    }


}
