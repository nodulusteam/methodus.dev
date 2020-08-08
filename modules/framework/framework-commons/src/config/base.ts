import { IMethodusConfig, ClassRef, MethodType, Dictionary } from "../interfaces";


export abstract class BaseServer { // implements Methodus.Server
    config?: IMethodusConfig;
    classRouters: ClassRef[] = [];
    useClass(classType: any, methodType: MethodType): void { return };
    _send(functionArgs: any[], methodinformation: any, paramsMap: Dictionary, securityContext?: Dictionary) {
        return new Object() as any;
    }
}
