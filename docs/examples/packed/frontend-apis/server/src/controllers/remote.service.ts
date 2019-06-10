import { MethodConfig, Method, Verbs, Body, Param, MethodResult, MethodError } from '@methodus/server';
import { TodoModel } from '../models/todo.model';

@MethodConfig('RemoteService')// anotate using the class Name - exact!
export class RemoteService {

    @Method(Verbs.Get, '/todos')
    public static async list(): Promise<MethodResult<TodoModel[]>> {
        return new MethodResult([]);
    }

    @Method(Verbs.Get, '/todos/:id')
    public static async get(@Param('id') id: number): Promise<MethodResult<TodoModel>> {
        return new MethodResult(new TodoModel());
    }

    @Method(Verbs.Post, '/todos')
    public static async create(@Body('data') data: TodoModel): Promise<MethodResult<TodoModel>> {
        return new MethodResult(data);
    }

    @Method(Verbs.Put, '/todos/:id')
    public static async update(@Param('id') id: number,
        @Body('data') data: TodoModel): Promise<MethodResult<TodoModel>> {
        return new MethodResult(data);
    }

}
