"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gRpcRouter = void 0;
const server_1 = require("@methodus/server");
const protobuf = require("protobufjs");
class gRpcRouter {
    constructor(obj, methodType, app) {
        this.routers = [];
        let keyName = obj.name;
        if (!keyName) {
            keyName = obj.constructor.name;
        }
        obj = server_1.Injector.get(keyName);
        const methodus = server_1.fp.maybeMethodus(obj)[keyName];
        const globalMiddlewares = [];
        if (methodus.middlewares) {
            methodus.middlewares.forEach((element) => {
                if (element) {
                    globalMiddlewares.push(element);
                }
                else {
                }
            });
        }
        const routerDataObject = {};
        const service = new protobuf.Service(methodus.name);
        Object.keys(methodus._descriptors).forEach((itemKey) => {
            const item = methodus._descriptors[itemKey];
            const method = new protobuf.Method(item.propertyKey, 'rpc', '', '');
            service.add(method);
            const router = service.create((method, requestData, callback) => { callback(null, protobuf.util.newBuffer(0)); }, true, true);
            routerDataObject[item.route] = routerDataObject[item.route] || [];
            routerDataObject[item.route].push(item);
        });
    }
}
exports.gRpcRouter = gRpcRouter;
