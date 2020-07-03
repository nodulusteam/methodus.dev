import { injectionModule as injection } from '@methodus/server';
import decorators from '@methodus/framework-decorators';
import { MethodResult } from '@methodus/framework-commons';
import { TestLogger } from './logger.service';

/**
 * @hidden
 */
@decorators.MethodConfig('DataService')
export class DataService {
    @decorators.Method()
    public async special(id: string) {
        return new MethodResult(id);
    }
    constructor(@injection.Inject() private testLogger: TestLogger) {
        this.testLogger.log('instance created for DataService');
    }

}
