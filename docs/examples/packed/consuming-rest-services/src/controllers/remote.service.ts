import { MethodConfig, Method, Verbs, Body, Param, MethodResult, MethodError } from '@methodus/server';

@MethodConfig('RemoteService')// anotate using the class Name - exact!
export class RemoteService {

    @Method(Verbs.Get, '/todos')
    public static async list(): Promise<MethodResult<string[]>> {
        return new MethodResult([]);
    }

    @Method(Verbs.Get, '/todos/:id')
    public static async get(@Param('id') id: number): Promise<MethodResult<any>> {
        return new MethodResult({});
    }

    @Method(Verbs.Post, '/todos')
    public static async create(@Body('data') data: any): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/todos/:id')
    public static async update(@Param('id') id: number, @Body('data') data: any): Promise<MethodResult> {
        return new MethodResult({});
    }

}
