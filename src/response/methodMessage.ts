import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'




@LogClass(logger)
export class MethodMessage {
    /**
     *
     */
    constructor(public to: string, public message: any, public metadata: any, public args: any, public correlationId?: string) {
    }

}


