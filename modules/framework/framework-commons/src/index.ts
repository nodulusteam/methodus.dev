import { Logger as _Logger, logger as _logger } from './log';
export *  from './interfaces';
export *  from './response';
import { util as _util } from './fp';


export namespace commons {
    export const Logger = _Logger;
    export const logger = _logger;
    export const util = _util;
}

export default commons;
