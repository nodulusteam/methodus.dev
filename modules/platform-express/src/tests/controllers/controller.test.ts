import {
    MethodResult, Verbs, Method, MethodMock, MethodConfig, MethodError, MethodPipe, MethodResultStatus,
    Param, Body, Headers, Files, Cookies, Query, Response, Request, SecurityContext, Auth, AuthType, Injectable
} from '@methodus/server';

/**
 * @hidden
 */
@Injectable()
@Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@MethodConfig('TestController')
export class TestController {
    @MethodMock({})
    @Method(Verbs.Get, '/api/player')
    public async list(
        @Headers('auth') auth: string = 'kkk',
        @Query('order_by') orderBy: string = 'asc'): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        //  result.setHeader('good-header', generateUuid());
        return result;
    }

    @Method(Verbs.Get, '/api/player/desfaults')
    public async listdefaults(@Param() params: any,
        @Body() body: any,
        @Headers() headers: any,
        @Files() files: any,
        @Cookies() cookies: any,
        @Query() query: any,
        @Response() res: any,
        @Request() req: any,
        @SecurityContext() securityContext: any,
    ): Promise<any> {
        return new MethodResultStatus([1, 2, 3, 4, 5], 203, 5, 1);
    }

    @MethodPipe(Verbs.Post, '/api/player')
    public async create(@Files('files') files: any,
        @Cookies('cookies') cookies: any, @Body('name') name: string) {
        return new MethodResult({ name });
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public async read(@Param('player_id') playerId: number) {
        throw new MethodError('intended error', 500, 'some more data');
    }

    @Method(Verbs.Get, '/api/player/:field/:value')
    public async getByField(@Param('field') field: any, @Param('value') value: number) {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/api/player')
    public async update() {
        return new MethodResult({});
    }

    @Method(Verbs.Delete, '/api/player')
    public delete() {
        return new MethodResult({});
    }

}
