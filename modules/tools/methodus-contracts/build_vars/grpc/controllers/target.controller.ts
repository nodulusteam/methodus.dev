import { MethodResult, Mapping } from '@methodus/server';
import { Mock } from '../mocks/mock';
import decorators from '@methodus/server/decorators';
@decorators.MethodConfig('Target')
export class Target {
    constructor() {

    }
    @decorators.MethodMock(Mock.simple)
    @decorators.Method()
    public async get(@Mapping.Param('id') id: string, @Mapping.SecurityContext() user: any): Promise<MethodResult<any>> {
        // some comments        
        return new MethodResult({ Name: 'roi' });
        //some other comments
    }

    @decorators.MethodMock(Mock.simple)
    @decorators.Method()
    public async post(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({ Name: 'roi' });
    }
}
