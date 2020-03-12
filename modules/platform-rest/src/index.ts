import { MethodError } from '@methodus/server';
import { WebRequest, Dictionary } from './web-request';
export const Http = { name: 'Http', path: '@methodus/platform-rest' };
export * from './web-request';
export * from './verbs';

export const name: string = 'Http/Rest';
export type ParamMapItem = { from: string; name?: string; index: number };
export interface MethodusObject {
    verb: string;
    route: string;
    resolver: Function;
    _auth: {
        type: number;
        options?: Dictionary<string>;
    };
}

export async function send(methodus: MethodusObject, functionArgs: any[], paramsMap: ParamMapItem[], securityContext?: any): Promise<any> {
    const request = new WebRequest(methodus._auth.type, methodus._auth.options);
    const baseUrl = methodus.resolver();

    if (baseUrl) {
        const requestResult = await request.sendRequest(methodus.verb, baseUrl + methodus.route, functionArgs, paramsMap, securityContext);
        if (requestResult.data) {
            return requestResult.data;
        } else {
            throw new MethodError(requestResult);
        }
    } else {
        throw new MethodError(`Missing base url for method ${methodus.route}`, 302);
    }
}
