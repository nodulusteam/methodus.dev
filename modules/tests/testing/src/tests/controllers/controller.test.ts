import decorators from '@methodus/server/decorators';
// import injection from '@methodus/server/injection';
import { AuthType, MethodResult, Mapping } from '@methodus/server/commons';
// import { TestLogger } from './logger.service';
import { ScreenModel } from '../models/screen.model';


/**
 * @hidden
 */
@decorators.Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@decorators.MethodConfig('TestController')
export class TestController {
    /**
     *
     */
    constructor() {
        // this.testLogger.log('instance created for TestController');
    }
    //@injection.Inject('TestLogger') private testLogger: TestLogger
    @decorators.Method('Post', '/api/screens')
    public async create(@Mapping.Body('item') item: ScreenModel) {
        return new MethodResult(item);
    }

}
