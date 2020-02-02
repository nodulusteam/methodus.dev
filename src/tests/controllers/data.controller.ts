import { Method, MethodResult, MethodConfigBase, Singleton } from '../shim';

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
