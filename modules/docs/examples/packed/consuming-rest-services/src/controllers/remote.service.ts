import { MethodConfig, Method, Body, Param, MethodResult, MethodError } from '@methodus/server';
import { Verbs } from '@methodus/platform-express';
import { Http } from '@methodus/platform-rest';


@MethodConfig('RemoteService')// anotate using the class Name - exact!
export class RemoteService {

    @Method(Verbs.Get, '/todos')
    public async list(): Promise<MethodResult<string[]>> {
        return new MethodResult([]);
    }

    @Method(Verbs.Get, '/todos/:id')
    public async get(@Param('id') id: number): Promise<MethodResult<any>> {
        return new MethodResult({});
    }

    @Method(Verbs.Post, '/todos')
    public async create(@Body('data') data: any): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/todos/:id')
    public async update(@Param('id') id: number, @Body('data') data: any): Promise<MethodResult> {
        return new MethodResult({});
    }

}
