import {
    MethodResult, Mapping, Method, MethodMock, MethodConfig, MethodPipe,
} from '../shim';
import { Auth, AuthType } from '../../decorators';
import { Injectable } from '../../di';
import { Verbs } from '@methodus/platform-express';

/**
 * @hidden
 */
@Injectable()
@Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@MethodConfig('TestTarget')
export class TestTarget {



    @Method(Verbs.Get, '/api/testTypes')
    public async testTypes(@Mapping.Query('date') date: Date): Promise<MethodResult> {
        return new MethodResult({});
    }




    @MethodPipe(Verbs.Post, '/api/player')
    public async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string): Promise<MethodResult> {
        return new MethodResult({});
    }



    @MethodMock({})
    @Method(Verbs.Get, '/api/player')
    public async list(@Mapping.Headers('auth') auth: string,
        @Mapping.Query('order_by') orderBy: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/desfaults')
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


    @Method(Verbs.Get, '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: string,
        @Mapping.Param('value') value: number): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/api/player')
    public async update(): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Delete, '/api/player')
    public async delete(): Promise<MethodResult> {
        return new MethodResult({});
    }

}
