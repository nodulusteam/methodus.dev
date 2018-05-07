// <references path='../interfaces/methodus.ts' />
import { MethodType, IMethodusConfig, Router } from '../';


export abstract class BaseServer { //implements Methodus.Server
    config: IMethodusConfig;
    classRouters: Router[];
    useClass(classType, methodType: MethodType) { };
    _send(functionArgs, methodinformation, paramsMap, securityContext) { };
}
