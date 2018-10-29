process.env.test = 'true';
import { Proxy as MethodusProxy } from '../decorators/proxy';

import {
    MethodConfig,
    ServerConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType, Param, MethodResult, Method, Verbs,
} from '../';
import { FirstClass } from './classes/FirstClass';
import { SecondClass } from './classes/SecondClass';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6695 })
// @PluginConfiguration(path.join(__dirname, 'static'), { path: '/client' })
@ClientConfiguration(FirstClass, MethodType.Local, ServerType.Express)
@ClientConfiguration(SecondClass, MethodType.Local, ServerType.Express)
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

@MethodusProxy.ProxyClass('FirstClass', '../src/tests/classes/FirstClass')
@MethodConfig('testClass')
export class XProxyClass {
    @Method(Verbs.Get, '/posts/:id/:name')
    public action1(@Param('id') id: number, @Param('name') name: string) {
        const result = new MethodResult({ value: 'FirstClass from contract', id, name, add: 'added' });
        return result;
    }

}
