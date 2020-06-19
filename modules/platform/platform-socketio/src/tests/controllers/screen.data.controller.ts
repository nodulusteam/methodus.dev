import { DataController } from './data.controller';
import { Mapping } from '@methodus/server';
import { ScreenModel } from '../models/screen.model';
import { MethodResult } from '@methodus/framework-commons';
import decorators from '@methodus/framework-decorators';
/**
 * @hidden
 */
@decorators.MethodConfig('ScreensDataController', [], '/screens')
export class ScreensDataController extends DataController {
    @decorators.Method('Get', '/special/:id')
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
