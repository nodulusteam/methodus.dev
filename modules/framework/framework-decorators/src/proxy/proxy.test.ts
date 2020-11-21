import { Proxy } from './proxy';
import { MethodConfig } from '../method/method-config';
import { Method } from '../method/method';
import injection from '@methodus/framework-injection';

@injection.Injectable('MethodHandler')
class MethodHandler {
    methodDecorator() { }
}

injection.Injector.register(
    'MethodHandler',
    MethodHandler,
    // [],
    // injection.RegistrationTypes.Service,
);

@MethodConfig('TestClass')
@Proxy.ProxyClass('me', 'TestClass', '')
class TestClass {
    @Method()
    public add() { }
}

new TestClass();
