import { Verbs, Method, Param, Body, MethodResult, MethodConfig } from '../../';

@MethodConfig('RemoteController')
export class RemoteController {

    @Method(Verbs.Get, '/items/:id')
    public async list(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/items/:id')
    public async get(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Post, '/id/')
    public async create(@Body('item') item: any): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/id/:id')
    public async update(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
    @Method(Verbs.Delete, '/id/:id')
    public async remove(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
