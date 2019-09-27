import { Proxy } from '../proxy';

import { MethodConfig, Method, Verbs } from '../../../shim';
(global as any).METHODUS_BRIDGE.classes['ProxiedClass'] = 'local';
@Proxy.ProxyClass('../build/decorators/proxy/test', 'ProxiedClass', './class.test')
@MethodConfig('ProxiedClass')
export class ProxiedClass {
    @Method(Verbs.Get, '/add')
    public static add(a: number, b: number) {
        return a + b;
    }
}
