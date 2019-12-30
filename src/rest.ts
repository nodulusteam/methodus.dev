// import { MethodResult, MethodError } from './response';
import { ServerType } from './interfaces';
import { Injector } from './di';
// import { RestParser as RestExpress, RestResponse as RestResponseExpress } from './transports/rest/rest';
// import * as etag from 'etag';

export class Verbs {
    public static Get: string = 'GET';
    public static Post: string = 'POST';
    public static Put: string = 'PUT';
    public static Patch: string = 'PATCH';
    public static Head: string = 'HEAD';
    public static Delete: string = 'DELETE';
}


/** this function parses values from the request object into the function args
 *  @param {any} args - the arguments sent to the original function.
 *  @param {[string]} paramsMap - express route string.
 *
 */
export class ResponseParser {
    parser: any;
    response: any;
    constructor(type: ServerType) {
        this.parser = Injector.get(`ParserFor${type}`);
        const responseClass = Injector.get(`ResponseFor${type}`);
        if (!this.parser || !responseClass) {
            throw new Error(`No ${type} parser loaded, are you missing an additional package?`)
        }
        this.response = responseClass.handle;
    }
    parse(args: any, paramsMap: any, functionArgs: any) {
        return this.parser.parse(args, paramsMap, functionArgs);
    }
}

