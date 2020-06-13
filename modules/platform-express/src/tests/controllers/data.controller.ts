import {  Method, Mapping, MethodResult, MethodConfigBase, injectionModule as injection, } from '@methodus/server';
import { Verbs } from '../shim';
/**
 * @hidden
 */
@injection.Singleton()
@MethodConfigBase('DataController')
export class DataController {
    public repository: any
    constructor(repo: any) {
        this.repository = repo;
    }

    @Method(Verbs.Get, '/id/:id')
    public async get(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);
        return new MethodResult(result);
    }
}
