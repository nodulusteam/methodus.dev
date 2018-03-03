// <references path='../interfaces/methodus.ts' />
import { MethodType } from '../';


export abstract class BaseServer { //implements Methodus.Server
    config: Methodus.IMethodusConfig;
    classRouters: Methodus.Router[];
    useClass(classType, methodType: MethodType) { };
    _send(functionArgs, methodinformation, paramsMap, securityContext) { };
}
