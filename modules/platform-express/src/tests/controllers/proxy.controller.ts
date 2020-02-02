import { Proxy, Method, MethodResult, MethodConfig, Mapping, } from '@methodus/server';
import { Verbs } from '../shim';

/**
 * @hidden
 */
@Proxy.ProxyClass(__dirname, 'ProxiedController', `./controller.test`)
@MethodConfig('ProxiedController')
export class ProxiedController {
    @Method(Verbs.Get, '/simple/get')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
