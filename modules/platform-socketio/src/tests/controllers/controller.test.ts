import { injectionModule as injection, MethodResult, Method, MethodMock, MethodConfig, MethodError, MethodPipe, MethodResultStatus, Mapping, Auth, AuthType } from '@methodus/server';

/**
 * @hidden
 */
@injection.Injectable()
@Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@MethodConfig('TestController')
export class TestController {
    @MethodMock({})
    @Method('Get', '/api/player')
    public async list(@Mapping.Headers('auth') auth: string = 'kkk', @Mapping.Query('order_by') orderBy: string = 'asc'): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        //  result.setHeader('good-header', generateUuid());
        return result;
    }

    @Method('Get', '/api/player/desfaults')
    public async listdefaults(
        @Mapping.Param() params: any,
        @Mapping.Body() body: any,
        @Mapping.Headers() headers: any,
        @Mapping.Files() files: any,
        @Mapping.Cookies() cookies: any,
        @Mapping.Query() query: any,
        @Mapping.Response() res: any,
        @Mapping.Request() req: any,
        @Mapping.SecurityContext() securityContext: any
    ): Promise<any> {
        return new MethodResultStatus([1, 2, 3, 4, 5], 203, 5, 1);
    }

    @MethodPipe('Post', '/api/player')
    public async create(@Mapping.Files('files') files: any, @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string) {
        return new MethodResult({ name });
    }

    @Method('Get', '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number) {
        throw new MethodError('intended error', 500);
    }

    @Method('Get', '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: any, @Mapping.Param('value') value: number) {
        return new MethodResult({});
    }

    @Method('Put', '/api/player')
    public async update() {
        return new MethodResult({});
    }

    @Method('Delete', '/api/player')
    public delete() {
        return new MethodResult({});
    }
}
