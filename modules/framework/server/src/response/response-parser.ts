import { ServerType } from '@methodus/framework-decorators/commons';
import injection from '@methodus/framework-decorators/injection';

/** this function parses values from the request object into the function args
 *  @param {any} args - the arguments sent to the original function.
 *  @param {[string]} paramsMap - express route string.
 *
 */

type nameStruct = { name: string }
export class ResponseParser {
    parser: any;
    response: any;
    constructor(type: ServerType | nameStruct) {
        const name = (type as nameStruct).name ? (type as nameStruct).name : type;
        this.parser = injection.Injector.resolve(`ParserFor${name}`);
        const responseClass = injection.Injector.resolve(`ResponseFor${name}`);
        if (!this.parser || !responseClass) {
            throw new Error(`No ${name} parser loaded, are you missing an additional package?`)
        }
        this.response = responseClass.handle;
    }
    parse(args: any, paramsMap: any, functionArgs: any) {
        return this.parser.parse(args, paramsMap, functionArgs);
    }
}

