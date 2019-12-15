import { MethodConfig, Method } from '../shim';
import { MethodResult } from '../../response';

/**
 * @hidden
 */
@MethodConfig('DataService')
export class DataService {
    @Method()
    public async special(id: string) {
        return new MethodResult(id);
    }
    constructor() {

    }

}
