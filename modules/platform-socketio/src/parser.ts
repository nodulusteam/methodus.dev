import { Injectable } from '@methodus/server';

/**
 * @hidden
 */
@Injectable('ParserForsocketio')
export class SocketIOParser {
    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {
        return new ParserResponse(args, false, {});

    }
}



/**
 * @hidden
 */
@Injectable('ResponseForsocketio')
export class SocketIOResponse {
    constructor() { }

    // public handle(args: any, methodResult: MethodResult | MethodError | any, headers: any) {
    //     const res = args[1]; // in express this will ontain the response
    //     if (methodResult && methodResult.statusCode) {
    //         res.status(methodResult.statusCode);
    //     } else if (!methodResult || methodResult.error) {
    //         res.status(500);
    //     } else {
    //         res.status(200);
    //     }

    //     if (methodResult && !methodResult.error) {
    //         if (methodResult.total) {
    //             res.set('X-Total-Count', methodResult.total);
    //         }

    //         if (methodResult.page) {
    //             res.set('X-Page', methodResult.page);
    //         }
    //     }
    //     if (methodResult === null) {
    //         throw (new MethodError('null result from controller function', 500));
    //     }

    //     if (headers) {
    //         Object.keys(headers).forEach((header) => {
    //             res.setHeader(header, headers[header]);
    //         });
    //     }

    //     // when we pipe the result using node streams we eed to pass in the original headers for the response
    //     if (methodResult && methodResult.result && methodResult.result.readable) {

    //         if (methodResult.headers) {
    //             Object.keys(methodResult.headers).forEach((key) => {
    //                 res.setHeader(key, methodResult.headers[key]);
    //             });
    //         }

    //         methodResult.result.pipe(res).on('error', (err: any) => {
    //             // logger.error('stream errored', err);
    //         }).on('reponse', (response: any) => {
    //             // logger.trace('stream responsed', response);
    //         }).on('finish', (response: any) => {
    //             // logger.info('stream finished');
    //         });
    //         return;
    //     }

    //     if (methodResult.error) {
    //         return res.json({ error: methodResult.error });
    //     } else if (methodResult.result && Buffer.isBuffer(methodResult.result)) {
    //         return res.end(methodResult.result);
    //     } else {
    //         if (methodResult.result === 0) {
    //             methodResult.result = JSON.stringify(methodResult.result);
    //         }

    //         if (typeof methodResult.result === 'string') {
    //             return res.end(methodResult.result, 'utf-8');
    //         } else {
    //             res.set('Content-Type', 'application/json');
    //             const str = JSON.stringify((methodResult.result) ? methodResult.result : methodResult);

    //             return res.send(str);
    //         }
    //     }
    // }

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