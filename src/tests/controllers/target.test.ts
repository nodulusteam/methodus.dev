import {
    MethodResult, Response, Request, Verbs, Method,
    Param, MethodMock, MethodConfig, Body, Query, Headers, Files, SecurityContext, Cookies, MethodPipe,
} from '../../shim';

/**
 * @ignore
 */
@MethodConfig('TestTarget')
export class TestTarget {
    @MethodMock({})
    @Method(Verbs.Get, '/api/player')
    public static async list(@Headers('auth') auth: string, @Query('order_by') orderBy: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/desfaults')
    public static async listdefaults(@Param() params: any,
        @Body() body: any,
        @Headers() headers: any,
        @Files() files: any,
        @Cookies() cookies: any,
        @Query() query: any,
        @Response() res: any,
        @Request() req: any,
        @SecurityContext() securityContext: any,
    ): Promise<any> {
        return new MethodResult({});
    }

    @MethodPipe(Verbs.Post, '/api/player')
    public static async create(@Files('files') files: any,
    @Cookies('cookies') cookies: any, @Body('name') name: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public static async read(@Param('player_id') playerId: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/:field/:value')
    public static async getByField(@Param('field') field: string, @Param('value') value: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/api/player')
    public static async update(): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Delete, '/api/player')
    public static async delete(): Promise<MethodResult> {
        return new MethodResult({});
    }

}
