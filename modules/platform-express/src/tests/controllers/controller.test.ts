import {
    MethodResult,  Method, MethodMock, MethodConfig, MethodError, MethodPipe, MethodResultStatus,
    Param, Mapping, Auth, AuthType, Injectable
} from '@methodus/server';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { MethodMiddleware } from '../middlewares/method.middleware';
import { Verbs } from '../shim';

/**
 * @hidden
 */
@Injectable()
@Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@MethodConfig('TestController', [AuthMiddleware])
export class TestController {
    @MethodMock({})
    @Method(Verbs.Get, '/api/player')
    public async list(
        @Mapping.Headers('auth') auth: string = 'kkk',
        @Mapping.Query('order_by') orderBy: string = 'asc'): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        //  result.setHeader('good-header', generateUuid());
        return result;
    }

    @Method(Verbs.Get, '/api/playerdata/defaults')
    public async listdefaults(@Param() params: any,
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
    public async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string) {
        return new MethodResult({ name });
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number) {
        throw new MethodError('intended error', 500, 'some more data');
    }

    @Method(Verbs.Get, '/api/player/:field/:value', [MethodMiddleware])
    public async getByField(@Mapping.Param('field') field: any, @Mapping.Param('value') value: number) {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/api/player')
    public async update() {
        return new MethodResult({});
    }

    @Method(Verbs.Delete, '/api/player')
    public async delete() {
        return {};
    }


    @Method(Verbs.Delete, '/api/player')
    public async delete2() {
        return Buffer.from('somestringforbuffe');
    }

    @Method(Verbs.Post, '/api/headers')
    public async headers(@Mapping.Headers() headers: any) {
        return headers;
    }


    @Method(Verbs.Get, '/api/buffer1')
    public async buffer1() {

        return new MethodResult(Buffer.from('somestringforbuffe'));
    }

    @Method(Verbs.Get, '/api/return0')
    public async return0() {

        return new MethodResult(0);
    }


}
