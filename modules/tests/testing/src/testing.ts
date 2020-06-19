import { Module } from './module';
import { TestMap } from './test-map';


export class Test {

    public static createTestingModule(testMap?: TestMap): Module {

        const mo = new Module(testMap);

        return mo;


    }
}
