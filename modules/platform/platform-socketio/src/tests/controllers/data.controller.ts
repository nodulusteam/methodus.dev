import { MethodConfigBase } from '@methodus/server';
import decorators from '@methodus/server/decorators';
import { MethodResult, Mapping } from '@methodus/server/commons';
import injection from '@methodus/server/injection';

/**
 * @hidden
 */
@injection.Singleton()
@MethodConfigBase('DataController')
export class DataController {
    public repository: any;
    constructor(repo: any) {
        this.repository = repo;
    }

    @decorators.Method('Get', '/id/:id')
    public async get(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);
        return new MethodResult(result);
    }
}
