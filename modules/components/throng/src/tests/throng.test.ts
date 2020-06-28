import { TestThrottleClass } from './test-throttle.class';
import { TestCacheClass } from './test-cache.class'
import { Store } from '../index';

const testArs: any = [];

for (let counter = 0; counter < 2; counter++) {
    testArs.push(['1111', '2222', counter, (counter % 2) === 0]);
}

(async () => {

    let promises: any = [];

    const instance = new TestCacheClass();
    const TESTHITS = (global as any).TESTHITS;
    instance.emitter.on('hit', (data: any) => {
        TESTHITS[data] = Number(TESTHITS[data]) + 1 || 1;
    });


    for (const test of testArs) {
        promises.push(instance.shouldNotCache(test[0], test[1], test[2]));
    }


    await Promise.all(promises);

    // let getCounter = 0;
    // //counting up
    // let getInterval = setInterval(async () => {
    //     //clearInterval(getInterval);
    //     promises = [];
    //     for (const test of testArs) {
    //         promises.push(instance.shouldCache(test[0], test[1], test[2], test[3]));
    //     }

    //     const callResult = await Promise.all(promises);
    //     getCounter++;

    // }, 1000 * 5);


})();
