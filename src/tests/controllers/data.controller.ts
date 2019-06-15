import { Verbs, Method, Mapping, MethodResult, MethodConfigBase } from '../shim';
/**
 * @hidden
 */
@MethodConfigBase('DataController')
export class DataController {
    public static repository: any;

    @Method(Verbs.Get, '/id/:id')
    public static async get(@Mapping.Param('id') id: string) {
        const result = (this as any).methodus.repository.get(id);
        return new MethodResult(result);
    }

}
