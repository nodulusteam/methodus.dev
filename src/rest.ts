import { MethodResult, MethodError } from './response';




export class Verbs {
    public static Get: string = 'GET';
    public static Post: string = 'POST';
    public static Put: string = 'PUT';
    public static Patch: string = 'PATCH';
    public static Head: string = 'HEAD';
    public static Delete: string = 'DELETE';

}


export function RestResponse(args, methodResult: MethodResult | MethodError | any) {
    let res = args[1];
    if (methodResult && methodResult.statusCode)
        res.status(methodResult.statusCode);
    else
        res.status(200);

    if (methodResult.error !== undefined)

        if (methodResult.total)
            res.set("X-Total-Count", methodResult.total);

    if (methodResult.page)
        res.set("X-Page", methodResult.page);

    res.send(methodResult.result || methodResult.error);
}


export function RestParser(args, paramsMap, functionArgs): ParserResponse {

    if (args.length > 2 && args[2].name === 'next')//this call came from an express route
    {
        paramsMap.forEach((item: any) => {
            item.value = args[0][item.from][item.name] || args[0][item.from];
            functionArgs.push(item.value);
        });

        return new ParserResponse(functionArgs, true);

    } else {
        return new ParserResponse(args, false);

    }

}


export class ParserResponse {
    constructor(args: any, isRest: boolean) {
        this.args = args;
        this.isRest = isRest;
    }
    args: any;
    isRest: boolean;
}