import { Proxy, Method, MethodResult, MethodConfig, Mapping, } from '@methodus/server';
import { Verbs } from '../shim';

/**
 * @hidden
 */
@MethodConfig('ProxiedController')
@Proxy.ProxyClass(__dirname, 'ProxiedController', `./controller.test`)
export class ProxiedController {
    @Method(Verbs.Get, '/simple/get')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
