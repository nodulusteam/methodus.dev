import { Verbs } from '../shim';
import decorators from '@methodus/server/decorators';
import { MethodResult, AuthType, Mapping } from '@methodus/server/commons';
/**
 * @hidden
 */
@decorators.Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@decorators.MethodConfig('TestTarget')
export class TestTarget {

    @decorators.MethodPipe(Verbs.Post, '/api/player')
    public async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string): Promise<MethodResult> {
        return new MethodResult({ status: 'ok' });
    }



    // @decorators.MethodMock({})
    @decorators.Method(Verbs.Get, '/api/player')
    public async list(@Mapping.Headers('auth') auth: string,
        @Mapping.Query('order_by') orderBy: string): Promise<MethodResult> {
        return new MethodResult({ auth, orderBy });
    }

    @decorators.Method(Verbs.Get, '/api/playerdata/defaults')
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


    @decorators.Method(Verbs.Get, '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Get, '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: string,
        @Mapping.Param('value') value: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Put, '/api/player')
    public async update(): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Delete, '/api/player')
    public async delete(): Promise<any> {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Delete, '/api/player')
    public async delete2() {
        return new MethodResult({});
    }



    @decorators.Method(Verbs.Post, '/api/headers')
    public async headers(@Mapping.Headers() headers: any) {
        return new MethodResult({});
    }


    @decorators.Method(Verbs.Get, '/api/buffer1')
    public async buffer1() {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Get, '/api/return0')
    public async return0() {
        return new MethodResult({});
    }

}
