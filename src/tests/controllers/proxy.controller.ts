import { Proxy, Method, MethodResult, MethodConfig, Verbs, Param } from '../../shim';

/**
 * @ignore
 */
@Proxy.ProxyClass(__dirname, 'ProxiedController', `./controller.test`)
@MethodConfig('ProxiedController')
export class ProxiedController {
    @Method(Verbs.Get, '/simple/get')
    public static async get(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
