import { Test, TestMap } from '../index';
import { TestController } from './controllers/controller.test';
import { ScreensDataController } from './controllers/screen.data.controller';
import { ScreenModel } from './models/screen.model';





describe('Test Testing module', () => {
    it('Load controller', async () => {

        const m = Test.createTestingModule(new TestMap({
            controllers: [TestController],
            providers: [ScreensDataController]
        }));

        const controller: TestController = m.get<TestController>('TestController');

        try {

            const result = await controller.create(new ScreenModel({ name: '' }));
            return result;

        } catch (error) {

            expect(error.message).toBe('Name should not be empty');

        }
        return true;

    });

    it('Load with empty testing module', async () => {

        const m = Test.createTestingModule();
        m.testMap = new TestMap({
            controllers: [TestController],
            providers: [ScreensDataController]
        })

        const controller: TestController = m.get<TestController>('TestController');

        try {

            const result = await controller.create(new ScreenModel({ name: '' }));
            return result;

        } catch (error) {

            expect(error.message).toBe('Name should not be empty');

        }
        return true;

    });


    it('Load with empty testing  and map', async () => {

        const m = Test.createTestingModule();
        m.testMap = new TestMap({});
        m.testMap.controllers = [TestController];
        m.testMap.providers = [ScreensDataController];
        const controller: TestController = m.get<TestController>('TestController');

        try {

            const result = await controller.create(new ScreenModel({ name: '' }));
            return result;

        } catch (error) {

            expect(error.message).toBe('Name should not be empty');

        }
        return true;

    });
});


// (async () => {

//     const m = Test.createTestingModule({
//         controllers: [TestController],
//         providers: [ScreensDataController]
//     } as TestMap);
//     const controller = m.get<TestController>('TestController');
//     const result = await controller.create({}, {}, 'TestController');
//     console.log(result);
//     return result;
// })()
