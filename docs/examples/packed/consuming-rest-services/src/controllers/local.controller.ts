import { MethodConfig, Method, Verbs, Body, Param, MethodResult, MethodError } from '@methodus/server';
import { RemoteService } from './remote.service';

@MethodConfig('LocalController')// anotate using the class Name - exact!
export class LocalController {

    @Method(Verbs.Get, '/todos')
    public async list(): Promise<MethodResult> {
        return await RemoteService.list(); // calling the remote service
    }

    @Method(Verbs.Get, '/todos/:id')
    public async get(@Param('id') id: number): Promise<MethodResult> {
        return await RemoteService.get(id);
    }

    @Method(Verbs.Post, '/todos')
    public async create(@Body('data') data: any): Promise<MethodResult> {
        return await RemoteService.create(data);
    }

    @Method(Verbs.Put, '/todos/:id')
    public async update(@Param('id') id: number, @Body('data') data: any): Promise<MethodResult> {
        return await RemoteService.update(id, data);
    }
}
