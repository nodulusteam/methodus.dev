import { Injectable, MethodResult, MethodError } from '@methodus/server';

import * as etag from 'etag';
/**
 * @hidden
 */
@Injectable('ParserForexpress')
export class RestParser {
    /** this function parses values from the request object into the function args
     *  @param {any} args - the arguments sent to the original function.
     *  @param {[string]} paramsMap - express route string.
     *
     */
    deserialize(item: { type: any, value: string }) {
        if (item !== undefined && item !== null) {
            if (item.type && item.type.deserialize) {
                try {
                    return item.type.deserialize(item.value);
                } catch (error) {
                    //  logger.warn(this, 'error deserializing argument', item);
                }
            } else if (item.type && item.type.prototype && item.type.prototype.constructor) {
                return new item.type(item.value);
            } else if (typeof (item.value) === 'string' && item.type === 'object') {
                try {
                    return JSON.parse(item.value);
                } catch (error) {
                    // logger.warn(this, 'error parsing argument', item);
                }

            } else if (item.value === undefined && typeof (item) === 'object') {
                return item;
            }
        } else {
            return item;
        }

        return item.value;
    }

    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {

        let isRest = false;

        let securityContext;
        if (args[0] && args[0].res && args[1] && args[1].req) {
            securityContext = args[0].security_context;
            functionArgs = functionArgs || [];
            paramsMap.forEach((item: any) => {
                let value = null;
                if (item.name && item.from) {
                    if (args[0][item.from]) {
                        value = args[0][item.from][item.name] || item.defaultValue || null;
                    }
                    value = this.deserialize({ value, type: item.type });
                } else if (item.from) {

                    switch (item.from) {
                        case 'response':
                            value = args[1];
                            break;
                        case 'request':
                            value = args[0];
                            break;
                        default:
                            value = this.deserialize({ type: item.type, value: args[0][item.from] });
                            break;
                    }

                } else {
                    value = args[0];
                }

                // security special case
                if (item.from === 'security_context') {
                    value = args[0].security_context;
                }
                functionArgs.push(value);
            });
            isRest = true;

        } else {
            functionArgs = args;
            isRest = false;
        }

        return new ParserResponse(functionArgs, isRest, securityContext);
    }

}



/**
 * @hidden
 */
@Injectable('ResponseForexpress')
export class RestResponse {
    constructor() { }

    public handle(args: any, methodResult: MethodResult | MethodError | any, headers: any) {
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

        // when we pipe the result using node streams we eed to pass in the original headers for the response
        if (methodResult && methodResult.result && methodResult.result.readable) {

            if (methodResult.headers) {
                Object.keys(methodResult.headers).forEach((key) => {
                    res.setHeader(key, methodResult.headers[key]);
                });
            }

            methodResult.result.pipe(res).on('error', (err: any) => {
                // logger.error('stream errored', err);
            }).on('reponse', (response: any) => {
                // logger.trace('stream responsed', response);
            }).on('finish', (response: any) => {
                // logger.info('stream finished');
            });
            return;
        }

        if (methodResult.error) {
            return res.json({ error: methodResult.error });
        } else if (methodResult.result && Buffer.isBuffer(methodResult.result)) {
            return res.end(methodResult.result);
        } else {
            if (methodResult.result === 0) {
                methodResult.result = JSON.stringify(methodResult.result);
            }

            if (typeof methodResult.result === 'string') {
                return res.end(methodResult.result, 'utf-8');
            } else {
                res.set('Content-Type', 'application/json');
                const str = JSON.stringify((methodResult.result) ? methodResult.result : methodResult);
                res.setHeader('ETag', etag(str));
                return res.send(str);
            }
        }
    }

}
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