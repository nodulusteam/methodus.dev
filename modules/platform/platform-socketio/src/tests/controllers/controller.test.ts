import { injectionModule as injection } from '@methodus/server';
import decorators from '@methodus/framework-decorators';
import { MethodResult, MethodError, MethodResultStatus, AuthType, Mapping } from '@methodus/framework-commons';
/**
 * @hidden
 */
@injection.Injectable()
@decorators.Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@decorators.MethodConfig('TestController')
export class TestController {
    @decorators.MethodMock({})
    @decorators.Method('Get', '/api/player')
    public async list(@Mapping.Headers('auth') auth: string = 'kkk', @Mapping.Query('order_by') orderBy: string = 'asc'): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        //  result.setHeader('good-header', generateUuid());
        return result;
    }

    @decorators.Method('Get', '/api/player/desfaults')
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

    @decorators.MethodPipe('Post', '/api/player')
    public async create(@Mapping.Files('files') files: any, @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string) {
        return new MethodResult({ name });
    }

    @decorators.Method('Get', '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number) {
        throw new MethodError('intended error', 500);
    }

    @decorators.Method('Get', '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: any, @Mapping.Param('value') value: number) {
        return new MethodResult({});
    }

    @decorators.Method('Put', '/api/player')
    public async update() {
        return new MethodResult({});
    }

    @decorators.Method('Delete', '/api/player')
    public delete() {
        return new MethodResult({});
    }
}
