import { MethodConfigBase, injectionModule as injection } from '@methodus/server';
import { MethodResult } from '@methodus/framework-commons';
import decorators from '@methodus/framework-decorators';
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

    @decorators.Method()
    public async get(id: string) {
        const result = this.repository.get(id);
        return new MethodResult(result);
    }

}
