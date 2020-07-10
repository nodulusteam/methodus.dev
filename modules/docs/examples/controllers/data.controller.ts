import { Method, Mapping  , MethodResult, MethodConfig } from '../../';
import { Verbs } from '@methodus/platform-rest';

@MethodConfig('DataController')
export class DataController {

    @Method(Verbs.Get, '/items/:id')
    public async list(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/items/:id')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Post, '/id/')
    public async create(@Body('item') item: any): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/id/:id')
    public async update(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
    @Method(Verbs.Delete, '/id/:id')
    public async remove(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
