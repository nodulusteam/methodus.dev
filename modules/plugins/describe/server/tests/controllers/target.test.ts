import decorators from '@methodus/server/decorators';
import { Mapping, MethodResult } from '@methodus/server/commons';
import { Verbs } from '@methodus/platform-express';

@decorators.MethodConfig('TestTarget', [], '/api/test-contracts')
export class TestTarget {

    @decorators.MethodMock({})
    @decorators.Method(Verbs.Get, '/comments')
    public async list(@Mapping.Query('pageNumber') pageNumber: number = 1, @Mapping.Query('pageSize') pageSize: number = 10): Promise<any> {
        return new MethodResult({});
    }




    @decorators.Method(Verbs.Get, '/comments/:id')
    public async get(@Mapping.Param('id') id: number, @Mapping.Headers('host') host: string = '',) {
        return new MethodResult({});
    }




    @decorators.MethodPipe(Verbs.Post, '/comments')
    public async create(@Mapping.Files('files') files: any,
        @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string) {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Get, '/comments')
    public async read() {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Put, '/comments')
    public async update() {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Delete, '/comments/:id')
    public async delete(@Mapping.Param('id') id: string) {
        return new MethodResult({});
    }

}
