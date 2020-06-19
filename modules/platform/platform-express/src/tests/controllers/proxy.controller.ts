import { Mapping, } from '@methodus/server';
import { Verbs } from '../shim';
import { MethodResult } from '@methodus/framework-commons';
import decorators from '@methodus/framework-decorators';
/**
 * @hidden
 */
@decorators.MethodConfig('ProxiedController')
@decorators.Proxy.ProxyClass(__dirname, 'ProxiedController', `./controller.test`)
export class ProxiedController {
    @decorators.Method(Verbs.Get, '/simple/get')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
