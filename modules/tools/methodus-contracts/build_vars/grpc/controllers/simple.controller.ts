import { Method, MethodConfig, MethodResult, Param, MethodMock, SecurityContext } from '@methodus/server';
import { Mock } from '../mocks/mock';




@MethodConfig('Simple')
export class Simple {
    constructor() {

    }
    @MethodMock(Mock.simple)
    @Method()
    public async get(@Param('id') id: string, @SecurityContext() user: any): Promise<MethodResult<any>> {
        // some comments
    
        return new MethodResult({ Name: 'roi' });
        //some othe comments
    }

    @MethodMock(Mock.simple)
    @Method()
    public async post(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({ Name: 'roi' });
    }
}
