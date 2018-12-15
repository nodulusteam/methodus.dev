import { Verbs, Method, Param, MethodResult, MethodConfigBase } from '../../src/';


@MethodConfigBase('Data')
export class DataController {
    public static repository: any;

    @Method(Verbs.Get, '/id/:id')
    public static async get(@Param('id') id: string) {

        const result = (this as any).methodus.repository.get(id);

        // const item = await this.repository.get(id);
        return new MethodResult(result);

        // const item = await this.repository.get(id);

    }
    // constructor(repository: any) {
    //     this.repository = repository;
    // }
}
