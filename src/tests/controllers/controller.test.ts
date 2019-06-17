import {
    MethodResult, Verbs, Method, MethodMock, MethodConfig, MethodError, MethodPipe, MethodResultStatus, generateUuid,
    Mapping,
} from '../shim';

/**
 * @hidden
 */
@MethodConfig('TestController')
export class TestController {
    @MethodMock({})
    @Method(Verbs.Get, '/api/player')
    public static async list(
        @Mapping.Headers('auth') auth: string,
        @Mapping.Query('order_by') orderBy: any): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        result.setHeader('good-header', generateUuid());
        return result;
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
        return new MethodResultStatus([1, 2, 3, 4, 5], 203, 5, 1);
    }

    @MethodPipe(Verbs.Post, '/api/player')
    public static async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string) {
        return new MethodResult({ name });
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public static async read(@Mapping.Param('player_id') playerId: number) {
        throw new MethodError('intended error', 500, 'some more data');
    }

    @Method(Verbs.Get, '/api/player/:field/:value')
    public static async getByField(@Mapping.Param('field') field: any, @Mapping.Param('value') value: number) {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/api/player')
    public static async update() {
        return new MethodResult({});
    }

    @Method(Verbs.Delete, '/api/player')
    public static delete() {
        return new MethodResult({});
    }

}
