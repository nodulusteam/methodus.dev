import { DataController } from './data.controller';
import { ScreenModel } from '../models/screen.model';
import decorators from '@methodus/framework-decorators';
import injection from '@methodus/framework-decorators/injection';

import { TestLogger } from './logger.service';
import { MethodResult, Mapping } from '@methodus/framework-decorators/commons';
import { Verbs } from '../models/verbs';

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
    constructor(@injection.Inject('TestLogger') private testLogger: TestLogger) {
        super(ScreenModel);
        this.testLogger.log('instance created for ScreensDataController');
        this.repository = ScreenModel;
    }

}
