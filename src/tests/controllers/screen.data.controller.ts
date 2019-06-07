import { DataController } from './data.controller';
import { MethodConfig, Method, Param, MethodResult, Verbs, MethodConfigExtend } from '../shim';
import { ScreenModel } from '../models/screen.model';

/**
 * @ignore
 */
@MethodConfigExtend(DataController)
@MethodConfig('ScreensDataController', [], ScreenModel)
export class ScreensDataController extends DataController {

    @Method(Verbs.Get, '/special/:id')
    public static async special(@Param('id') id: string) {
        const result = this.repository.get(id);

        // const item = await this.repository.get(id);
        return new MethodResult(result);
    }
    constructor() {
        super();
    }

}
