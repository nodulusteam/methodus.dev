import { Verbs, Method, Param, MethodResult, MethodConfigBase } from '../shim';
/**
 * @ignore
 */
@MethodConfigBase('DataController')
export class DataController {
    public static repository: any;

    @Method(Verbs.Get, '/id/:id')
    public static async get(@Param('id') id: string) {
        const result = (this as any).methodus.repository.get(id);
        return new MethodResult(result);
    }

}
