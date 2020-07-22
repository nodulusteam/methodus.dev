import decorators from '@methodus/framework-decorators';
import injection from '@methodus/framework-injection';
import { Mapping, MethodResult } from '@methodus/framework-commons';
import { Verbs } from '../models/verbs';
import { MethodConfigBase } from '../../method';
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
