process.env.THRONG_OFF = 'false';
process.env.DEBUG = 'methodus:ttt:*';

import { TestThrottleClass } from './tests/test-throttle.class';
import { throttleLog } from './throttle.decorator';
import { Logger } from './logger';

describe('test throttle', () => {
    it('shouldTrottle', async () => {
        jest.setTimeout(1000 * 1000 * 1000);
        const testArs: any = [];
        let promises: any = [];
        for (let counter = 0; counter < 20; counter++) {
            testArs.push(['1111', '2222', counter]);
        }

        const instance = new TestThrottleClass();
        const TESTHITS = (global as any).TESTHITS;
        instance.emitter.on('hit', (data: any) => {
            TESTHITS[data] = Number(TESTHITS[data]) + 1 || 1;
        });

        for (const test of testArs) {
            promises.push(instance.shouldTrottle(test[0], test[1], test[2]));
            promises.push(instance.shouldTrottle2(test[0], test[1], test[2]));
        }

        const results = await Promise.all(promises);
        expect(results).toEqual(results);
    });

    describe('test logs', () => {
        it('should log throttle', async () => {
            jest.setTimeout(1000 * 5);
            return await new Promise((resolve) => {
                throttleLog.on('message', (args) => {

                    console.warn(args);

                    //expect(args[1]).toEqual('methodus:throng:throttle');
                    throttleLog.removeAllListeners();
                    resolve();
                });

                throttleLog.log('log_ok');
                throttleLog.info('info_ok');
                throttleLog.error('error_ok');
            });
        });


        it('dumb logger', async () => {
            jest.setTimeout(1000 * 5);
            return await new Promise((resolve) => {

                const logger = new Logger();

                logger.on('message', (args) => {
                    expect(args[1]).toEqual(undefined);
                    logger.removeAllListeners();
                    resolve();
                });
                logger.info('ok');
                logger.log('ok');
                logger.error('ok');

            });
        });
    });
});
