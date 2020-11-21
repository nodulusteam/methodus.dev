import { Injector } from './container';
import { Main, ClassA, ClassB } from './di.test';
const mo = new Main(new ClassA(), new ClassB());
console.log(mo);

describe('Injection decorators', () => {
    it('Create server', async () => {
        const mainModule = Injector.resolve<Main>('Main');
        const aModule = Injector.resolve<ClassA>('ClassA');
        const bModule = Injector.resolve<ClassB>('ClassB');
        expect(mainModule).toBeDefined();
        expect(aModule).toBeDefined();
        expect(bModule).toBeDefined();
    });

    it('Use dependency', async () => {
        //Injector.inject(RegistrationTypes.Service, ClassB, 'ClassB');
        const mainModule = Injector.resolve<Main>('Main');
        const result = mainModule.add(2, 3);
        expect(mainModule).toBeDefined();
        expect(result).toBe(11);
    });
});
