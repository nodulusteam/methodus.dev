import {
    injectionModule as injection, decoratorsModule as decorators,
    Mapping
} from '@methodus/server';
import { AuthType } from '@methodus/framework-commons';
import { MethodResult } from '@methodus/framework-commons';

/**
 * @hidden
 */
@injection.Injectable()
@decorators.Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@decorators.MethodConfig('TestTarget')
export class TestTarget {

    @decorators.MethodPipe('Post', '/api/player')
    public async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string): Promise<MethodResult> {
        return new MethodResult({});
    }



    @decorators.MethodMock({})
    @decorators.Method('Get', '/api/player')
    public async list(@Mapping.Headers('auth') auth: string,
        @Mapping.Query('order_by') orderBy: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.Method('Get', '/api/player/desfaults')
    public async listdefaults(@Mapping.Param() params: any,
        @Mapping.Body() body: any,
        @Mapping.Headers() headers: any,
        @Mapping.Files() files: any,
        @Mapping.Cookies() cookies: any,
        @Mapping.Query() query: any,
        @Mapping.Response() res: any,
        @Mapping.Request() req: any,
        @Mapping.SecurityContext() securityContext: any,
    ): Promise<any> {
        return new MethodResult({});
    }


    @decorators.Method('Get', '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.Method('Get', '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: string,
        @Mapping.Param('value') value: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.Method('Put', '/api/player')
    public async update(): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.Method('Delete', '/api/player')
    public async delete(): Promise<MethodResult> {
        return new MethodResult({});
    }

}
