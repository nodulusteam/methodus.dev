import { injectionModule as injection, decoratorsModule as decorators, MethodConfigBase } from '@methodus/server';
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

    @decorators.Method('Get', '/id/:id')
    public async get(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);
        return new MethodResult(result);
    }

}
