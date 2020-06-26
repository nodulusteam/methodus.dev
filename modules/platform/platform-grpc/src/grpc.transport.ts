export const gRpc = { name: 'gRpc', path: '@methodus/platform-grpc' };
import * as protobuf from 'protobufjs';
import * as grpc from 'grpc';
import { Injector } from '../../../lib';
// /**
//  * @hidden
//  */
export const name: string = 'gRpc';
// /**
//  * @hidden
//  */
export function send(methodus: any, functionArgs: any, paramsMap: any, securityContext: any): any {


    const service = new protobuf.Service(methodus.name, {});
    const method = new protobuf.Method(methodus.propertyKey, 'rpc', '', '');
    service.add(method);

    const controller = Injector.get(methodus.name);

    // service.create((method, requestData, callback) => {
    //     callback(null, protobuf.util.newBuffer(0));
    // }, true, true);
    var server: any = new grpc.Server();

    server.addService(service, {
        [methodus.propertyKey]: controller[methodus.propertyKey]
    });


    const serviceDescriptor: any = grpc.loadObject<protobuf.Service>(service);

    const stub = new serviceDescriptor('localhost:50051', grpc.credentials.createInsecure());
    stub.service.add(2, 5, (err: any, feature: any) => {
        if (err) {
            console.error(err);
            // process error
        } else {
            console.log(feature);
            // process feature
        }
    });

    // const request = new WebRequest(methodus._auth.type, methodus._auth.options);
    // const baseUrl = methodus.resolver();
    // if (baseUrl) {
    //     return request.sendRequest(methodus.verb, baseUrl + methodus.route, functionArgs,
    //         paramsMap, securityContext) as any;
    // } else {
    //     throw new MethodError('no server found for this method' + methodus.route, 302);
    // }
}
