import { commonsModule as commons, decoratorsModule as decorators, MethodResult, Verbs } from '@methodus/server';
import { Query as DataQuery } from '@methodus/data';
import { UserModel } from '../models/user.model';
const Mapping = commons.Mapping;
@decorators.MethodConfigBase('Data')
export class DataController {

    /*
    this comment should stay all the way up to the contract
    */
    @decorators.Method(Verbs.Get, '/id/:id')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult<UserModel>> {
        const repo = (this as any).methodus.repository;
        const item = await repo.get(id);
        return new MethodResult<UserModel>(item);
    }

    @decorators.Method(Verbs.Post, '/insert')
    public async create(@Mapping.Body('record') record: any): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const item = await repo.insert(record);
        return new MethodResult(item);
    }

    @decorators.Method(Verbs.Post, '/id/:id')
    public async update(@Mapping.Param('id') id: string, @Mapping.Body('record') record: any): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const item = await repo.update({ _id: id }, record);
        return new MethodResult(item);
    }

    @decorators.Method(Verbs.Delete, '/id/:id')
    public async delete(@Mapping.Param('id') id: string): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const item = await repo.delete({ _id: id });
        return new MethodResult(item);
    }

    @decorators.Method(Verbs.Post, '/query')
    public async query(@Mapping.Body('query') queryObject: any): Promise<MethodResult> {
        const repo = (this as any).methodus.repository;
        const query = new DataQuery(repo.odm.collectionName);
        query.filter(queryObject);
        const item = await repo.query(query);
        return new MethodResult(item);
    }
}
