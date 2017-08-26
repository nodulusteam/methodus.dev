import { Log, Logger } from 'logelas'
export { Log, LogClass } from 'logelas';


let logName = 'methodulus';
if (process.env.logName)
    logName = process.env.logName;

export const logger = new Logger(logName + '.log', logName);