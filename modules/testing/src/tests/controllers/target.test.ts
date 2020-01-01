import {
    MethodResult, Mapping, Method, MethodMock, MethodConfig, MethodPipe, Auth, AuthType, Injectable
} from '@methodus/server';


/**
 * @hidden
 */
@Injectable()
@Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@MethodConfig('TestTarget')
export class TestTarget {

    @MethodPipe('Post', '/api/player')
    public async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string): Promise<MethodResult> {
        return new MethodResult({});
    }



    @MethodMock({})
    @Method('Get', '/api/player')
    public async list(@Mapping.Headers('auth') auth: string,
        @Mapping.Query('order_by') orderBy: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method('Get', '/api/player/desfaults')
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


    @Method('Get', '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method('Get', '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: string,
        @Mapping.Param('value') value: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method('Put', '/api/player')
    public async update(): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method('Delete', '/api/player')
    public async delete(): Promise<MethodResult> {
        return new MethodResult({});
    }

}
