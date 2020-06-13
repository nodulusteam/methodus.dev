import { DataController } from './data.controller';
import { ScreenModel } from '../models/screen.model';
import { MethodConfig, Method, Mapping, MethodResult, injectionModule as injection } from '@methodus/server';
import { TestLogger } from './logger.service';

/**
 * @hidden
 */
@MethodConfig('ScreensDataController', [], '/screens')
export class ScreensDataController extends DataController {

    @Method('Get', '/special/:id')
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
