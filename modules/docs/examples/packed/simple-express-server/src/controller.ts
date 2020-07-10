import { MethodConfig, Method, Body, Param, MethodResult, MethodError } from '@methodus/server';
import { Verbs } from '@methodus/platform-express';

const items: any = { 'item1': 'item 1 value', 'item2': 'item 2 value', 'item3': 'item 3 value', }


@MethodConfig('DataController')// anotate using the class Name - exact!
export class DataController {

    @Method(Verbs.Get, '/')
    public async list(): Promise<MethodResult> {
        return new MethodResult(items); // always return a MethodResult object
    }

    @Method(Verbs.Get, '/:id')
    public async get(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult(items[id]);
    }

    @Method(Verbs.Get, '/api/error/')
    public async error(@Body('item') item: any): Promise<MethodResult> {
        throw new MethodError('some error happend', 503);
    }
}