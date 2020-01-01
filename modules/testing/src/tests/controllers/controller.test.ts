import {
    MethodResult, Method, MethodConfig, Mapping, Auth, AuthType, Injectable, Inject
} from '@methodus/server';
import { TestLogger } from './logger.service';
import { ScreenModel } from '../models/screen.model';

/**
 * @hidden
 */
@Injectable()
@Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@MethodConfig('TestController')
export class TestController {

    /**
     *
     */
    constructor(@Inject() private testLogger: TestLogger) {
        this.testLogger.log('instance created for TestController');
    }

    @Method('Post', '/api/screens')
    public async create(@Mapping.Body('item') item: ScreenModel) {
        return new MethodResult(item);
    }

}
