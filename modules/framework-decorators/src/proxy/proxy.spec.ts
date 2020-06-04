import { Proxy } from './proxy';
import { MethodConfig } from '../method/method-config';
import { Method } from '../method/method';
import {
    Injector,
    RegistrationTypes,
    Injectable,
} from '@methodus/framework-injection';

@Injectable('MethodHandler')
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

describe('Test Proxy decorator', () => {
    it('createNew', async () => {
        const result = new TestClass();
        expect(result).not.toBeNull();
    });
});
