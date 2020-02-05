import { DataController } from './data.controller';
import { MethodConfig, Method, Mapping, MethodResult } from '../shim';
import { ScreenModel } from '../models/screen.model';
import { Inject } from '../../di';
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
    constructor(@Inject('TestLogger', 'testLogger') private testLogger: TestLogger) {
        super(ScreenModel);
        this.testLogger.log('instance created for ScreensDataController');
        this.repository = ScreenModel;
    }

}
