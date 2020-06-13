import { Proxy } from './proxy';
import { MethodConfig } from '../method/method-config';
import { Method } from '../method/method';
import injection from '@methodus/framework-injection';

@injection.Inject('MethodHandler')
class MethodHandler {
    methodDecorator() {}
}

injection.Injector.register(
    MethodHandler,
    [],
    injection.RegistrationTypes.Service,
    'MethodHandler'
);

@MethodConfig('TestClass')
@Proxy.ProxyClass('me', 'TestClass', '')
class TestClass {
    @Method()
    public add() {}
}

new TestClass();
