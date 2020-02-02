// tslint:disable-next-line:no-reference
/// <reference path="./method.ts" />
import 'reflect-metadata';
// tslint:disable-next-line:no-namespace
export namespace Methods {
    /** the @MethodMock decorator 

     */

    export function MethodMock(mockedResult: any) {
        return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
            const name = target.name || target.constructor.name;
            const methodus = target.methodus[name];
            methodus._mocks = methodus._mocks || {};

            if (typeof mockedResult === 'function') {
                methodus._mocks[propertyKey] = mockedResult;
            } else {
                methodus._mocks[propertyKey] = () => mockedResult;
            }

            return descriptor;
        };
    }
}
