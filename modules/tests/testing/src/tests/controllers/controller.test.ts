import {
    injectionModule as injection, decoratorsModule as decorators,
    Mapping
} from '@methodus/server';
import { AuthType, MethodResult } from '@methodus/framework-commons';
import { TestLogger } from './logger.service';
import { ScreenModel } from '../models/screen.model';


/**
 * @hidden
 */
@injection.Injectable()
@decorators.Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@decorators.MethodConfig('TestController')
export class TestController {
    /**
     *
     */
    constructor(@injection.Inject() private testLogger: TestLogger) {
        this.testLogger.log('instance created for TestController');
    }

    @decorators.Method('Post', '/api/screens')
    public async create(@Mapping.Body('item') item: ScreenModel) {
        return new MethodResult(item);
    }

}
