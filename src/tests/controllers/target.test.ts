import {
    MethodResult, Mapping, Verbs, Method, MethodMock, MethodConfig, MethodPipe,
} from '../shim';

/**
 * @hidden
 */
@MethodConfig('TestTarget')
export class TestTarget {
    @MethodMock({})
    @Method(Verbs.Get, '/api/player')
    public static async list(@Mapping.Headers('auth') auth: string,
        @Mapping.Query('order_by') orderBy: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/desfaults')
    public static async listdefaults(@Mapping.Param() params: any,
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

    @MethodPipe(Verbs.Post, '/api/player')
    public static async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public static async read(@Mapping.Param('player_id') playerId: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/:field/:value')
    public static async getByField(@Mapping.Param('field') field: string,
        @Mapping.Param('value') value: number): Promise<MethodResult> {
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
