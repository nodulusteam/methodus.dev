import { injectionModule as injection, Method, Mapping, MethodResult, MethodConfigBase } from '@methodus/server';
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

    @Method('Get', '/id/:id')
    public async get(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);
        return new MethodResult(result);
    }
}
