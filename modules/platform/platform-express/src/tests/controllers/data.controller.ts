import { MethodConfigBase } from '@methodus/server';
import injection from '@methodus/server/injection';
import decorators from '@methodus/server/decorators';
import { Verbs } from '../shim';
import { MethodResult, Mapping } from '@methodus/server/commons';
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

    @decorators.Method(Verbs.Get, '/id/:id')
    public async get(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);
        return new MethodResult(result);
    }
}
