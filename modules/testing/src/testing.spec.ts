import { Test } from "./testing";
import { TestController } from './tests/controllers/controller.test';
import { TestMap } from './test-map';
import { ScreensDataController } from './tests/controllers/screen.data.controller';



(async () => {

    const m = Test.createTestingModule({
        controllers: [TestController],
        providers: [ScreensDataController]
    } as TestMap);
    const controller = m.get<TestController>('TestController');
    const result = await controller.create({}, {}, 'TestController');
    console.log(result);
    return result;
})()
