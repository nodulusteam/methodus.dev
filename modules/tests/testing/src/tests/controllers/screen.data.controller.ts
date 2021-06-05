import { DataController } from './data.controller';
import { ScreenModel } from '../models/screen.model';
import decorators from '@methodus/server/decorators';
//import injection from '@methodus/server/injection';
//import { TestLogger } from './logger.service';
import { MethodResult, Mapping } from '@methodus/server/commons';
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
    //@injection.Inject('TestLogger') private testLogger: TestLogger
    constructor() {
        super(ScreenModel);
        // this.testLogger.log('instance created for ScreensDataController');
        this.repository = ScreenModel;
    }

}
