import { Verbs, Method, Param, Body, MethodResult, MethodConfig } from '../../';

@MethodConfig('DataController')
export class DataController {

    @Method(Verbs.Get, '/items/:id')
    public static async list(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/items/:id')
    public static async get(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Post, '/id/')
    public static async create(@Body('item') item: any): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/id/:id')
    public static async update(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
    @Method(Verbs.Delete, '/id/:id')
    public static async remove(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
