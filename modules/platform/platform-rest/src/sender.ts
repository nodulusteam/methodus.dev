import { WebRequest } from './web-request';
import { MethodusObject, ParamMapItem } from './interfaces';
import { MethodError, MethodResult } from '@methodus/framework-commons';

export * from './web-request';
export * from './interfaces';

export const name: string = 'Http/Rest';

export async function send<T = any>(methodus: MethodusObject, functionArgs: any[], paramsMap: ParamMapItem[], securityContext?: any): Promise<MethodResult<T>> {
    const request = new WebRequest();
    const baseUrl = typeof methodus.resolver === 'function' ? methodus.resolver() : methodus.resolver;

    if (baseUrl) {
        const requestOptions = await request.sendRequest.apply(request, [methodus, baseUrl + methodus.route, functionArgs, paramsMap, securityContext]);
        try {
            const requestResult = await request.send(requestOptions);
            return createResult(requestResult);
        } catch (error) {
            throw new MethodError(error);
        }
    } else {
        throw new MethodError(`Missing base url for method ${methodus.route}`, 302);
    }
}

function createResult(requestResult: any) {
    const result = new MethodResult(requestResult.data);
    if (requestResult.status) {
        result.statusCode = requestResult.status;
    }
    return result;
}
