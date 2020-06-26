import decorators from '@methodus/framework-decorators';
import { Mapping, MethodResult } from '@methodus/framework-commons';
import { Verbs } from '@methodus/platform-express';

@decorators.Proxy.ProxyClass(__dirname, 'ProxiedController', `./controller.test`)
@decorators.MethodConfig('ProxiedController', [], '/api')
export class ProxiedController {
    @decorators.Method(Verbs.Get, '/simple/get')
    public async get(@Mapping.Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
