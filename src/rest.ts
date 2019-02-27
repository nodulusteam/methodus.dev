import { MethodResult, MethodError } from './response';
import { logger, LogClass } from './log';
import { ServerType } from './interfaces';
import { RestParser as RestExpress, RestResponse as RestResponseExpress } from './servers/express/rest';
import { RestParser as RestFastify, RestResponse as RestResponseFastify } from './servers/fastify/rest';
import * as etag from 'etag';

export class Verbs {
    public static Get: string = 'GET';
    public static Post: string = 'POST';
    public static Put: string = 'PUT';
    public static Patch: string = 'PATCH';
    public static Head: string = 'HEAD';
    public static Delete: string = 'DELETE';
}

export class RestResponse {
    constructor(args, methodResult: MethodResult | MethodError | any, headers: any) {
        const res = args[1]; // in express this will ontain the response

        if (methodResult && methodResult.statusCode) {
            res.status(methodResult.statusCode);
        } else if (!methodResult || methodResult.error) {
            res.status(500);
        } else {
            res.status(200);
        }

        if (methodResult && !methodResult.error) {
            if (methodResult.total) {
                res.set('X-Total-Count', methodResult.total);
            }

            if (methodResult.page) {
                res.set('X-Page', methodResult.page);
            }
        }
        if (methodResult === null) {
            throw (new MethodError('null result from controller function', 500));
        }

        if (headers) {
            Object.keys(headers).forEach((header) => {
                res.setHeader(header, headers[header]);
            });
        }

        // when we pipe the result using node streams we eed to pass inthe original headers for the response
        if (methodResult && methodResult.result && methodResult.result.readable) {

            if (methodResult.headers) {
                Object.keys(methodResult.headers).forEach((key) => {
                    res.setHeader(key, methodResult.headers[key]);
                });
            }

            methodResult.result.pipe(res).on('error', (err) => {
                console.error('stream errored', err);
            }).on('reponse', (response) => {
                console.error('stream responsed', response);
            }).on('finish', (response) => {
                console.error('stream finished');
            });
            return;
        }

        if (methodResult.error) {
            res.send(methodResult.error);
        } else if (methodResult.result && Buffer.isBuffer(methodResult.result)) {
            res.send(methodResult.result);
        } else {
            if (methodResult.result === 0) {
                methodResult.result = JSON.stringify(methodResult.result);
            }

            if (typeof methodResult.result === 'string') {
                res.send(methodResult.result);
            } else {
                res.header('Content-Type', 'application/json');
                // handle ETAG

                res.set('Content-Type', 'application/json');
                const str = JSON.stringify((methodResult.result) ? methodResult.result : methodResult);
                res.setHeader('ETag', etag(str));
                res.send(str);

            }
        }
    }
}

/** this function parses values from the request object into the function args
 *  @param {any} args - the arguments sent to the original function.
 *  @param {[string]} paramsMap - express route string.
 *
 */
export class RestParser {
    parser: any;
    response: any;
    constructor(type: ServerType) {
        switch (type) {

            case ServerType.HTTP2:
                this.parser = new RestFastify();
                this.response = RestResponseFastify;
                break;
            case ServerType.Express:
            default:
                this.parser = new RestExpress();
                this.response = RestResponseExpress;
                break;
        }
    }
    parse(args, paramsMap, functionArgs) {
        return this.parser.parse(args, paramsMap, functionArgs);
    }
}

@LogClass(logger)
export class ParserResponse {
    args: any;
    isRest: boolean;
    securityContext: any;
    constructor(args: any, isRest: boolean, securityContext: any) {
        this.args = args;
        this.isRest = isRest;
        this.securityContext = securityContext;
    }
}
