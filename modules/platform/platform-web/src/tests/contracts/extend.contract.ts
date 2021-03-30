import * as M from '../..';
import { BaseTestContract } from './base.contract';
import { Inject } from '../..';
import { TestContract } from './simple.contract';

@M.Injectable('ExtendTestContract')
@M.MethodConfig('ExtendTestContract', [], '/api')
export class ExtendTestContract extends BaseTestContract {
    constructor(@Inject('TestContract') testContract: TestContract) {
        super();
    }
}
