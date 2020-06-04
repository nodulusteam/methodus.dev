import { Logger } from '../index';

describe('Test Logger', () => {
    let logger = new Logger('methodus');
    it('log ', async () => {
        logger.log();
        logger.log('log some data');
    });

    it('debug ', async () => {
        logger.debug();
        logger.debug('log some data');
    });

    it('error ', async () => {
        logger.error();
        logger.error('log some data');
    });

    it('warn ', async () => {
        logger.warn();
        logger.warn('log some data');
    });
});
