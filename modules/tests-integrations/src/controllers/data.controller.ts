import { Method, MethodResult, MethodConfigBase } from '@methodus/server';
import { Singleton } from '@methodus/framework-injection';
/**
 * @hidden
 */
@Singleton()
@MethodConfigBase('DataController')
export class DataController {
    public repository: any
    constructor(repo: any) {

        this.repository = repo;
    }

    @Method()
    public async get(id: string) {
        const result = this.repository.get(id);
        return new MethodResult(result);
    }

}
