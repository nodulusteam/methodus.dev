
// import { WebRequest } from './web-request';
export * from './web-request'
// import { MethodError } from '../../response';
// /**
//  * @hidden
//  */
// export const name: string = 'Http/Rest';
// /**
//  * @hidden
//  */
// export function send(methodus: any, functionArgs: any, paramsMap: any, securityContext: any): Promise<any> {
//     debugger;
//     console.log(methodus)
//     const request = new WebRequest(methodus._auth.type, methodus._auth.options);
//     const baseUrl = methodus.resolver();
//     if (baseUrl) {
//         return request.sendRequest(methodus.verb, baseUrl + methodus.route, functionArgs,
//             paramsMap, securityContext) as any;
//     } else {
//         throw new MethodError('no server found for this method' + methodus.route, 302);
//     }
// }
