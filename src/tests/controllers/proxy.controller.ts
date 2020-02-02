import { Proxy, Method, MethodResult, MethodConfig, Mapping, } from '../shim';
import { Verbs } from '@methodus/platform-express';
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
