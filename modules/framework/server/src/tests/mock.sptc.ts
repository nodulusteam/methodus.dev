import injection from '@methodus/framework-decorators/injection';
import { deserialize } from '../method/deserialize';
import { MethodError, MethodResult } from '@methodus/framework-decorators/commons';

@injection.Injectable('ParserForundefined')
export class ParserForMocker {
    /**
     *
     */
    constructor() {}
    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {
        functionArgs = functionArgs || [];
        paramsMap.forEach((item: any) => {
            let value = null;
            const typeForDeserialization = item.actualType.odm ? item.actualType : item.type;
            value = deserialize({ value: args[item.index], type: typeForDeserialization });
            functionArgs.push(value);
        });
        return new ParserResponse(functionArgs, false, {});
    }
}

/**
 * @hidden
 */
@injection.Injectable('ResponseForundefined')
export class MockerResponse {
    public handle(args: any, methodResult: MethodResult | MethodError | any, headers: any) {
        return methodResult;
    }
}
class ParserResponse {
    args: any;
    isRest: boolean;
    securityContext: any;
    constructor(args: any, isRest: boolean, securityContext: any) {
        this.args = args;
        this.isRest = false;
        this.securityContext = securityContext;
    }
}
