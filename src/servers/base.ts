// <references path='../interfaces/methodus.ts' />
import { MethodType, IMethodusConfig } from '../shim';
import { Dictionary } from '../interfaces';

export abstract class BaseServer { // implements Methodus.Server
    config?: IMethodusConfig;
    classRouters: any[] = [];
    useClass(classType: any, methodType: MethodType) { return new Object() as any; }
    _send(functionArgs: any[], methodinformation: any, paramsMap: Dictionary, securityContext?: any) {
        return new Object() as any;
    }
}
