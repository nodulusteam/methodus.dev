import { MethodConfig, Method,MethodResult, injectionModule as injection } from '@methodus/server';
import { TestLogger } from './logger.service';

/**
 * @hidden
 */
@MethodConfig('DataService')
export class DataService {
    @Method()
    public async special(id: string) {
        return new MethodResult(id);
    }
    constructor(@injection.Inject() private testLogger:TestLogger) {
        this.testLogger.log('instance created for DataService');
    }

}
