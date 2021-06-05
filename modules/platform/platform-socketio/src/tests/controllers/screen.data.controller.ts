import { ScreenModel } from '../models/screen.model';
import { MethodResult, Mapping } from '@methodus/server/commons';
import decorators from '@methodus/server/decorators';
/**
 * @hidden
 */
@decorators.MethodConfig('ScreensDataController', [], '/screens')
export class ScreensDataController {
    repository: any;
    @decorators.Method('Get', '/special/:id')
    public async special(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);

        // const item = await this.repository.get(id);
        return new MethodResult(result);
    }
    constructor() {
        // super(ScreenModel);
        this.repository = ScreenModel;
    }
}
