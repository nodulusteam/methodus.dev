import { Test, TestMap } from '@methodus/testing';
import { TestController } from './controllers/controller.test';
import { ScreensDataController } from './controllers/screen.data.controller';
import { ScreenModel } from './models/screen.model';



// (async () => {

//     const m = Test.createTestingModule({
//         controllers: [TestController],
//         providers: [ScreensDataController]
//     } as TestMap);
//     const controller: TestController = m.get<TestController>('TestController');

//     try {
//         const result = await controller.create(new ScreenModel({ name: '' }));
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//         debugger
//     }


// })()



describe('Test Testing module', () => {
    it('Load controller', async () => {
        const m = Test.createTestingModule({
            controllers: [TestController],
            providers: [ScreensDataController]
        } as TestMap);
        const controller: TestController = m.get<TestController>('TestController');
        try {
            const result = await controller.create(new ScreenModel({ name: '' }));
            return result;
        } catch (error) {
            expect(error.message).toBe('Name should not be empty')
        }
        return true;

    });
});
