import { Module } from './module';
import { TestMap } from './test-map';


export class Test {

    public static createTestingModule(testMap: TestMap) {

        const mo = new Module();

        return mo;


    }
}
