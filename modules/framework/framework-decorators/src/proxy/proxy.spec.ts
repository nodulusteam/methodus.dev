import { Proxy } from './proxy';
import { MethodConfig } from '../method/method-config';
import { Method } from '../method/method';
import injection from '@methodus/framework-injection';

@injection.Injectable('MethodHandler')
class MethodHandler {
    methodDecorator() {
        return null;
    }
}

injection.Injector.register('MethodHandler', MethodHandler);

@MethodConfig('TestClass')
@Proxy.ProxyClass('me', 'TestClass', '')
class TestClass {
    @Method()
    public add(a:number, b: number) {
        return a + b;
    }
}

describe('Test Proxy decorator', () => {
    it('createNew', async () => {
        const result = new TestClass();
        expect(result).not.toBeNull();
    });
});
