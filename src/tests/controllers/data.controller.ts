import { Verbs, Method, Mapping, MethodResult, MethodConfigBase,Injectable } from '../shim';
/**
 * @hidden
 */
@Injectable()
@MethodConfigBase('DataController')
export class DataController {
    public repository: any;

    @Method(Verbs.Get, '/id/:id')
    public async get(@Mapping.Param('id') id: string) {
        const result = (this as any).methodus.repository.get(id);
        return new MethodResult(result);
    }

}
