import * as path from 'path';
import { ConfiguredServer, } from '@methodus/server';
import decorators from '@methodus/framework-decorators';
import { deserialize } from '@methodus/server';
import injection from '@methodus/server/injection';
import { MethodResult, MethodError } from '@methodus/framework-commons';
import { TestController } from '../controllers/';
import { TestTarget } from '../controllers/';
import { EmitterPlugin } from './emitter.plugin';

const ServerPlugin = new EmitterPlugin();
/**
 * @hidden
 */
@decorators.PluginConfiguration(path.join(__dirname, 'simple.plugin'))
@decorators.ServerConfiguration(ServerPlugin, {})
@decorators.RouterConfiguration(TestController, ServerPlugin)
@decorators.ClientConfiguration(TestTarget, ServerPlugin)
export class EmitterTestServer extends ConfiguredServer {
    constructor() {
        super(EmitterTestServer);
    }
}




/**
 * @hidden
 */
@injection.Injectable('ParserForPlugin')
export class ParserForPlugin {
    /**
     *
     */
    constructor() {

    }
    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {


        functionArgs = functionArgs || [];
        paramsMap.forEach((item: any) => {
            let value = null;
            const typeForDeserialization = (item.actualType.odm) ? item.actualType : item.type;
            value = deserialize({ value: args[item.index], type: typeForDeserialization });
            functionArgs.push(value);
        });
        return new ParserResponse(functionArgs, false, {});
    }

}



/**
 * @hidden
 */
@injection.Injectable('ResponseForPlugin')
export class EmitterResponse {
    constructor() { }

    public handle(args: any, methodResult: MethodResult | MethodError | any, headers: any) {

        return methodResult;
        // const res = args[1]; // in express this will ontain the response
        // if (methodResult && methodResult.statusCode) {
        //     res.status(methodResult.statusCode);
        // } else if (!methodResult || methodResult.error) {
        //     res.status(500);
        // } else {
        //     res.status(200);
        // }

        // if (methodResult && !methodResult.error) {
        //     if (methodResult.total) {
        //         res.set('X-Total-Count', methodResult.total);
        //     }

        //     if (methodResult.page) {
        //         res.set('X-Page', methodResult.page);
        //     }
        // }
        // if (methodResult === null) {
        //     throw (new MethodError('null result from controller function', 500));
        // }

        // if (headers) {
        //     Object.keys(headers).forEach((header) => {
        //         res.setHeader(header, headers[header]);
        //     });
        // }

        // // when we pipe the result using node streams we eed to pass in the original headers for the response
        // if (methodResult && methodResult.result && methodResult.result.readable) {

        //     if (methodResult.headers) {
        //         Object.keys(methodResult.headers).forEach((key) => {
        //             res.setHeader(key, methodResult.headers[key]);
        //         });
        //     }

        //     methodResult.result.pipe(res).on('error', (err: any) => {
        //         // logger.error('stream errored', err);
        //     }).on('reponse', (response: any) => {
        //         // logger.trace('stream responsed', response);
        //     }).on('finish', (response: any) => {
        //         // logger.info('stream finished');
        //     });
        //     return;
        // }

        // if (methodResult.error) {
        //     return res.json({ error: methodResult.error });
        // } else if (methodResult.result && Buffer.isBuffer(methodResult.result)) {
        //     return res.end(methodResult.result);
        // } else {
        //     if (methodResult.result === 0) {
        //         methodResult.result = JSON.stringify(methodResult.result);
        //     }

        //     if (typeof methodResult.result === 'string') {
        //         return res.end(methodResult.result, 'utf-8');
        //     } else {
        //         res.set('Content-Type', 'application/json');
        //         const str = JSON.stringify((methodResult.result) ? methodResult.result : methodResult);
        //         res.setHeader('ETag', etag(str));
        //         return res.send(str);
        //     }
        // }
    }

}
export class ParserResponse {
    args: any;
    isRest: boolean;
    securityContext: any;
    constructor(args: any, isRest: boolean, securityContext: any) {
        this.args = args;
        this.isRest = false;
        this.securityContext = securityContext;
    }
}