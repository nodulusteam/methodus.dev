import { MethodConfigBase, injectionModule as injection, decoratorsModule as decorators } from '@methodus/server';
import { Verbs } from '../shim';
import { MethodResult, Mapping } from '@methodus/framework-commons';
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
