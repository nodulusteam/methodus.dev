import { DataController } from './data.controller';
import { MethodConfig, Method, Mapping, MethodResult, Verbs } from '@methodus/server';
import { ScreenModel } from '../models/screen.model';

/**
 * @hidden
 */
@MethodConfig('ScreensDataController', [], '/screens')
export class ScreensDataController extends DataController {

    @Method(Verbs.Get, '/special/:id')
    public async special(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);

        // const item = await this.repository.get(id);
        return new MethodResult(result);
    }
    constructor() {
        super(ScreenModel);
        this.repository = ScreenModel;
    }

}
