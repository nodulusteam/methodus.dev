import { decoratorsModule as decorators,  } from '@methodus/server';
import { MethodResult, Mapping } from '@methodus/framework-commons';
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
