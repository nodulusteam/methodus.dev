import injection from '@methodus/framework-injection';
import { TestMap } from './test-map';
export class Module {
    public testMap: TestMap

    constructor(testMap?: TestMap) {
        this.testMap = (testMap) ? testMap : new TestMap();
    }
    get<T>(name: string) {
        return injection.Injector.get<T>(name);
    }
}
