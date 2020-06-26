import {
    MethodConfigBase,
} from '@methodus/server';
import decorators from '@methodus/framework-decorators';
import { Mapping, MethodResult } from '@methodus/framework-commons';
import { Verbs } from '@methodus/platform-express';
import { DB } from '../db';

@MethodConfigBase('BaseController')
export class BaseController {
    @decorators.MethodMock({})
    @decorators.Method(Verbs.Get, '/')
    public async list(@Mapping.Query('filter') filter: any = {}, @Mapping.Query('pageNumber') pageNumber: number = 1,
        @Mapping.Query('pageSize') pageSize: number = 10, @Mapping.Request() req?: any): Promise<any> {

        if (!filter) {
            filter = {};
        }
        const dbResult = DB.getPosts(filter, pageNumber, pageSize);
        const result = new MethodResult(dbResult);
        result.linkAction('get', BaseController, 'Post', dbResult, req.headers['host']);
        return result.apply();
    }

    @decorators.Method(Verbs.Get, '/:id')
    public async get(@Mapping.Param('id') id: number, @Mapping.Headers('host') host: string = '',) {
        const dbResult = DB.getPosts({ id: Number(id) }, 1, 10);
        const result = new MethodResult(dbResult);
        result.linkAction('list', BaseController, 'Get', {}, host);
        return result.apply();
    }

    @decorators.Method(Verbs.Get, '/get/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number) {
        return new MethodResult(playerId);
    }

    @decorators.Method(Verbs.Get, '/:field/:value')
    public async getByField(@Mapping.Param('field') field: string, @Mapping.Param('value') value: number) {
        return new MethodResult({});
    }
}
