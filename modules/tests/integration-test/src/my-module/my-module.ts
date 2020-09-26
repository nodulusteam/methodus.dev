import { Module } from '@methodus/server';
import { SingleControllerName } from "./single-controller-name/single-controller-name";

@Module('MyModule')
export class MyModule {
    constructor() {

    }

    declarations = [SingleControllerName];
}
