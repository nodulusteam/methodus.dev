import { MethodConfig, Method, Inject,MethodResult } from '@methodus/server';
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
    constructor(@Inject() private testLogger:TestLogger) {
        this.testLogger.log('instance created for DataService');
    }

}
