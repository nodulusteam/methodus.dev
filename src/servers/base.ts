export abstract class BaseServer implements Methodulus.Server {
    config: Methodulus.IMethodulusConfig;
    classRouters: Methodulus.Router[];
    useClass(classType){};
    _send(functionArgs, methodinformation, paramsMap){};
}