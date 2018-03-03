import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'

 
@LogClass(logger)
export class MethodResult {
    result: any;
    page: any;
    total?: number;
    statusCode?: number;
    constructor(result, total?: number, page?: number) {
        this.result = result;
        if (total)
            this.total = total;
        if (page)
            this.page = page;
    }

}
