import decorators from '@methodus/server/decorators';
import injection from '@methodus/server/injection';
import { TestLogger } from './logger.service';
import { MethodResult } from '@methodus/server/commons';
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
