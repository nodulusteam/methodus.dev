// <references path='../interfaces/methodus.ts' />
import { MethodType, IMethodusConfig } from '../';

export abstract class BaseServer { // implements Methodus.Server
    config?: IMethodusConfig;
    classRouters: any[] = [];
    useClass(classType: any, methodType: MethodType) { return new Object() as any; }
    _send(functionArgs: any, methodinformation: any, paramsMap: any, securityContext: any) {
        return new Object() as any;
    }
}
