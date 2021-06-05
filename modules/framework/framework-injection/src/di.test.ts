import injection from './index';
@injection.Injectable('ClassA')
export class ClassA {
    getSum(a: number, b: number) {
        return a + b;
    }
}
@injection.Injectable('ClassB')
export class ClassB {
    getSum(a: number, b: number) {
        return a * b;
    }
}

@injection.Singleton('Main')
export class Main {
    public serviceA?: ClassA;
    public serviceB?: ClassB;
    constructor(
        @injection.Inject('ClassA') serviceA: ClassA,
        @injection.Inject('ClassB') serviceB: ClassB
    ) {
        //this.calcService = ClassAService;
        // this.serviceB = serviceB;
    }
    add(a: number, b: number) {
        return this.serviceA!.getSum(a, b) + this.serviceB!.getSum(a, b);
    }
}

// Injector.inject(RegistrationTypes.Service, ClassA, 'ClassA');
// const classA: ClassA = injection.Injector.resolve<ClassA>('ClassA');
// const classB: ClassB = injection.Injector.resolve<ClassB>('ClassB');
// const main: Main = injection.Injector.resolve<Main>('Main');
// const result = main.add(2, 3);
// console.log(result);

// Injector.inject(RegistrationTypes.Service, ClassB, 'ClassB');
// const moduleB: ClassB = Injector.get(ClassB);

// console.log(moduleB);
