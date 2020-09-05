import injection from '@methodus/server/injection';
import deocorators from '@methodus/framework-decorators';
import { MethodResult, Mapping } from '@methodus/framework-commons';
import { DataController } from './data.controller';
import { ScreenModel } from '../models/screen.model';
import { TestLogger } from './logger.service';
/**
 * @hidden
 */
@deocorators.MethodConfig('ScreensDataController', [], '/screens')
export class ScreensDataController extends DataController {

    @deocorators.Method('Get', '/special/:id')
    public async special(@Mapping.Param('id') id: string) {
        const result = this.repository.get(id);

        // const item = await this.repository.get(id);
        return new MethodResult(result);
    }
    constructor(@injection.Inject('TestLogger', 'testLogger') private testLogger: TestLogger) {
        super(ScreenModel);
        this.testLogger.log('instance created for ScreensDataController');
        this.repository = ScreenModel;
    }

}
