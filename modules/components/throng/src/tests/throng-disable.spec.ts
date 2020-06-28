process.env.THRONG_OFF = 'true';
import { TestClass } from './test-disabled.class'

describe('Disable throng', () => {

    it('Cache should be disabled', async () => {
        jest.setTimeout(1000 * 1000 * 1000);
        const testArs: any = [];
        let promises: any = [];
        for (let counter = 0; counter < 20; counter++) {
            testArs.push(['1111', '2222', counter]);
        }

        const instance = new TestClass();
        const TESTHITS = (global as any).TESTHITS;
        instance.emitter.on('hit', (data: any) => {
            TESTHITS[data] = Number(TESTHITS[data]) + 1 || 1;

        });

        for (const test of testArs) {
            promises.push(instance.shouldCache(test[0], test[1], test[2]));
        }


        const results = await Promise.all(promises);
        expect(results.length).toEqual(results.length);
        promises = [];

        for (const test of testArs) {
            promises.push(instance.shouldCache(test[0], test[1], test[2]));
        }
        await Promise.all(promises);

    });


    it('Throttle should be disabled', async () => {
        jest.setTimeout(1000 * 1000 * 1000);
        const testArs: any = [];
        let promises: any = [];
        for (let counter = 0; counter < 20; counter++) {
            testArs.push(['1111', '2222', counter]);
        }

        const instance = new TestClass();
        const TESTHITS = (global as any).TESTHITS;
        instance.emitter.on('hit', (data: any) => {
            TESTHITS[data] = Number(TESTHITS[data]) + 1 || 1;
        });

        for (const test of testArs) {
            promises.push(instance.shouldTrottle(test[0], test[1], test[2]));
        }

        const results = await Promise.all(promises);
        expect(results).toEqual(results);
    });

})