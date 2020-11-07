import decorators from '@methodus/framework-decorators';
import injection from '@methodus/framework-decorators/injection';
import { TestLogger } from './logger.service';
import { MethodResult } from '@methodus/framework-decorators/commons';

/**
 * @hidden
 */
@decorators.MethodConfig('DataService')
export class DataService {
    @decorators.Method()
    public async special(id: string) {
        return new MethodResult(id);
    }
    constructor(@injection.Inject('TestLogger') private testLogger:TestLogger) {
        this.testLogger.log('instance created for DataService');
    }

}
