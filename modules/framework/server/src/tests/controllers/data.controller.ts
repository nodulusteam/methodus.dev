import decorators from '@methodus/framework-decorators';
import { Mapping, MethodResult } from '@methodus/framework-decorators/commons';
import { Verbs } from '../models/verbs';
/**
 * @hidden
 */
@decorators.MethodConfig('DataController')
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
