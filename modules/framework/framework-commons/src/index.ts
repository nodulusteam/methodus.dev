import { Logger as _Logger, logger as _logger } from './log';
import { fp } from './fp';

export * from './interfaces';
export * from './config';
export namespace commons {
    export const Logger = _Logger;
    export const logger = _logger;
    export const util = fp;
}

export default commons;
export * from './param/mapping';
export * from './response';