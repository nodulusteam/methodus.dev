import { DataController } from './data.controller';
import decorators from '@methodus/server/decorators';
import { MethodResult, Mapping } from '@methodus/server/commons';
import { ScreenModel } from '../models/screen.model';
import { Verbs } from '../shim';

/**
 * @hidden
 */
@decorators.MethodConfig('ScreensDataController', [], '/screens')
export class ScreensDataController extends DataController {

    @decorators.Method(Verbs.Get, '/special/:id')
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
