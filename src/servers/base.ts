// <references path='../interfaces/methodus.ts' />
import { MethodType, IMethodusConfig } from '../';

export abstract class BaseServer { // implements Methodus.Server
    config: IMethodusConfig;
    classRouters: any[];
    useClass(classType, methodType: MethodType) { const val = methodType; }
    _send(functionArgs, methodinformation, paramsMap, securityContext) {const val = functionArgs; }
}
