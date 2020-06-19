import { Singleton, Inject, Injectable } from './decorators';
@Injectable('ClassA')
export class ClassA {
    getSum(a: number, b: number) {
        return a + b;
    }
}
@Injectable('ClassB')
export class ClassB {
    getSum(a: number, b: number) {
        return a * b;
    }
}

@Singleton('Main')
export class Main {
    public serviceA?: ClassA;
    public serviceB: ClassB;
    constructor(
        @Inject('ClassA', 'serviceA') serviceA: ClassA,
        @Inject('ClassB') serviceB: ClassB
    ) {
        //this.calcService = ClassAService;
        this.serviceB = serviceB;
    }
    add(a: number, b: number) {
        return this.serviceA!.getSum(a, b) + this.serviceB?.getSum(a, b);
    }
}

// // Injector.inject(RegistrationTypes.Service, ClassA, 'ClassA');
// const main: Main = Injector.get(Main);
// //Injector.inject(RegistrationTypes.Service, ClassB, 'ClassB');
// const moduleB: ClassB = Injector.get(ClassB);
// const result = main.add(2, 3);
// console.log(result);
// console.log(moduleB);
