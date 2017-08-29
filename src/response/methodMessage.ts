import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'

 

 
@LogClass(logger)
export class MethodMessage {
    to: string;
    message: any;
    metadata: any;
    args: any;
    correlationId: string;
}