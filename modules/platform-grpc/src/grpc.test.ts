import gRpc from "./index";
import { gRpcPlugin } from './grpc';
import { MethodType, MethodConfig, Method } from '../../../lib';
import { Server } from '@methodus/server';
import { send } from './grpc.transport';


@MethodConfig('Controller')
class Controller {
    @Method()
    public add(a: number, b: number): number {
        return a + b;
    }

    @Method()
    public multiply(a: number, b: number): number {
        return a * b;
    }

}



(async () => {
    const server = new Server();
    const moduleGrpc: gRpcPlugin = gRpc.module.register({ type: gRpc, options: { port: 50050 } }, server);
    moduleGrpc.useClass(Controller, MethodType.Local);
    const casted = (Controller.prototype as any).methodus['Controller'];
    const merged = Object.assign({}, casted, casted._descriptors['add'])
    await send(merged, [1, 3], {}, {});
})()


