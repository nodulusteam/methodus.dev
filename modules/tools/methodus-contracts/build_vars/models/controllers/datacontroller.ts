import { MethodConfig, Method, Param, MethodResult, Body, Verbs } from '@methodus/server';
import { Query as DataQuery } from '@methodus/data';
import { UserModel } from '../models/user.model';

@MethodConfigBase('Data')
export class DataController {

    /*
    this comment should stay all the way up to the contract
    */
    @Method(Verbs.Get, '/id/:id')
    public  async get(@Param('id') id: string): Promise<MethodResult<UserModel>> {
        const repo = (this as any).methodus.repository;
        const item = await repo.get(id);
        return new MethodResult<UserModel>(item);
    }

    @Method(Verbs.Post, '/insert')
    public  async create(@Body('record') record: any): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const item = await repo.insert(record);
        return new MethodResult(item);
    }

    @Method(Verbs.Post, '/id/:id')
    public  async update(@Param('id') id: string, @Body('record') record: any): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const item = await repo.update({ _id: id }, record);
        return new MethodResult(item);
    }

    @Method(Verbs.Delete, '/id/:id')
    public  async delete(@Param('id') id: string): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const item = await repo.delete({ _id: id });
        return new MethodResult(item);
    }

    @Method(Verbs.Post, '/query')
    public  async query(@Body('query') queryObject: any): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const query = new DataQuery(repo.odm.collectionName);
        query.filter(queryObject);
        const item = await repo.query(query);
        return new MethodResult(item);
    }
}
