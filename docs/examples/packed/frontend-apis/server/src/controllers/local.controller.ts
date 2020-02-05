import { MethodConfig, Method, Body, Param, MethodResult, Inject } from '@methodus/server';
import { Verbs } from '@methodus/platform-express';
import { RemoteService } from './remote.service';
import { TodoModel } from '../models/todo.model';

@MethodConfig('LocalController')// anotate using the class Name - exact!
export class LocalController {
    constructor(@Inject('RemoteService') public remoteService: RemoteService) {


    }
    @Method(Verbs.Get, '/todos')
    public async list(): Promise<MethodResult<TodoModel[]>> {
        return await this.remoteService.list(); // calling the remote service
    }

    @Method(Verbs.Get, '/todos/:id')
    public async get(@Param('id') id: number): Promise<MethodResult> {
        return await this.remoteService.get(id);
    }

    @Method(Verbs.Post, '/todos')
    public async create(@Body('data') data: any): Promise<MethodResult> {
        return await this.remoteService.create(data);
    }

    @Method(Verbs.Put, '/todos/:id')
    public async update(@Param('id') id: number, @Body('data') data: any): Promise<MethodResult> {
        return await this.remoteService.update(id, data);
    }
}
