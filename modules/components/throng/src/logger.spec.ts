process.env.THRONG_OFF = 'false';
import { cacheLog } from './cache.decorator';

describe('Logger', () => {
    it('Cache log', async () => {
        jest.setTimeout(1000 * 5);
        return await new Promise((resolve) => {
            cacheLog.on('message', (args) => {
                expect(args[1]).toEqual('methodus:throng:cache');
                cacheLog.removeAllListeners();
                resolve();
            });
            cacheLog.log('ok');
        });
    });
});
