"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.name = exports.gRpc = void 0;
exports.gRpc = { name: 'gRpc', path: '@methodus/platform-grpc' };
const protobuf = require("protobufjs");
const grpc = require("grpc");
const lib_1 = require("../../../lib");
exports.name = 'gRpc';
function send(methodus, functionArgs, paramsMap, securityContext) {
    const service = new protobuf.Service(methodus.name, {});
    const method = new protobuf.Method(methodus.propertyKey, 'rpc', '', '');
    service.add(method);
    const controller = lib_1.Injector.get(methodus.name);
    var server = new grpc.Server();
    server.addService(service, {
        [methodus.propertyKey]: controller[methodus.propertyKey]
    });
    const serviceDescriptor = grpc.loadObject(service);
    const stub = new serviceDescriptor('localhost:50051', grpc.credentials.createInsecure());
    stub.service.add(2, 5, (err, feature) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(feature);
        }
    });
}
exports.send = send;
