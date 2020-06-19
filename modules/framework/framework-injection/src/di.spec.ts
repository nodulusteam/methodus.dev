import { Injector } from './injector';
import { Main, ClassA, ClassB } from './di.test';

describe('Injection decorators', () => {
    it('Create server', async () => {
        const mainModule = Injector.get(Main);
        const aModule = Injector.get(ClassA);
        const bModule = Injector.get(ClassB);
        expect(mainModule).toBeDefined();
        expect(aModule).toBeDefined();
        expect(bModule).toBeDefined();
    });

    it('Use dependency', async () => {
        //Injector.inject(RegistrationTypes.Service, ClassB, 'ClassB');
        const mainModule = Injector.get(Main);
        const result = mainModule.add(2, 3);
        expect(module).toBeDefined();
        expect(result).toBe(11);
    });
});
