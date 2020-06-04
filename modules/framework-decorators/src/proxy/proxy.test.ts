import { Proxy } from './proxy';
import { MethodConfig } from '../method/method-config';
import { Method } from '../method/method';
import {
    Inject,
    Injector,
    RegistrationTypes,
} from '@methodus/framework-injection';

@Inject('MethodHandler')
class MethodHandler {
    methodDecorator() {}
}

Injector.register(
    MethodHandler,
    [],
    RegistrationTypes.Service,
    'MethodHandler'
);

@MethodConfig('TestClass')
@Proxy.ProxyClass('me', 'TestClass', '')
class TestClass {
    @Method()
    public add() {}
}

new TestClass();
