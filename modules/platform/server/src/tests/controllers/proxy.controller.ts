import decorators from '@methodus/framework-decorators';
import { Verbs } from '../models/verbs';
import { MethodResult, Mapping } from '@methodus/framework-decorators/commons';
/**
 * @hidden
 */
@decorators.Proxy.ProxyClass(__dirname, 'ProxiedController', `./controller.test`)
@decorators.MethodConfig('ProxiedController')
export class ProxiedController {
    @decorators.Method(Verbs.Get, '/simple/get')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
