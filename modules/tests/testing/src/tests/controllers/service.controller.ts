import { injectionModule, decoratorsModule as decorators } from '@methodus/server';
import { TestLogger } from './logger.service';
import { MethodResult } from '@methodus/framework-commons';
/**
 * @hidden
 */
@decorators.MethodConfig('DataService')
export class DataService {
    @decorators.Method()
    public async special(id: string) {
        return new MethodResult(id);
    }
    constructor(@injectionModule.Inject() private testLogger: TestLogger) {
        this.testLogger.log('instance created for DataService');
    }

}
