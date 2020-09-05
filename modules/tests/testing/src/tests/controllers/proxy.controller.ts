import decorators from '@methodus/server/decorators';
import { MethodResult, Mapping } from '@methodus/server/commons';
/**
 * @hidden
 */
@decorators.Proxy.ProxyClass(__dirname, 'ProxiedController', `./controller.test`)
@decorators.MethodConfig('ProxiedController')
export class ProxiedController {
    @decorators.Method('Get', '/simple/get')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
