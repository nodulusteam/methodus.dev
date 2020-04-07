import { MethodError } from '@methodus/server';
import { WebRequest } from './web-request';
import { MethodusObject, ParamMapItem } from './interfaces';
export const Http = { name: 'Http', path: '@methodus/platform-rest' };
export * from './web-request';
export * from './interfaces';

export const name: string = 'Http/Rest';



export async function send(methodus: MethodusObject, functionArgs: any[], paramsMap: ParamMapItem[], securityContext?: any): Promise<any> {
    const request = new WebRequest();
    const baseUrl = (typeof methodus.resolver === 'function') ? methodus.resolver() : methodus.resolver;

    if (baseUrl) {
        const requestResult = await request.sendRequest.apply(this, [methodus, baseUrl + methodus.route, functionArgs, paramsMap, securityContext]);
        if (requestResult.data) {
            return requestResult.data;
        } else {
            throw new MethodError(requestResult);
        }
    } else {
        throw new MethodError(`Missing base url for method ${methodus.route}`, 302);
    }
}
