import * as M from '../../lib/index';
import { BaseTestContract } from './base.contract';
import { Inject } from '../../lib/index';
import { TestContract } from './simple.contract';

@M.Injectable('ExtendTestContract')
@M.MethodConfig('ExtendTestContract', [], '/api')
export class ExtendTestContract extends BaseTestContract {
    constructor(@Inject('TestContract') testContract: TestContract) {
        super();
    }
}
