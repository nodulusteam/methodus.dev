declare module Methodus {
    interface IMethodusClassConfig {
        methodType: MethodType;
        classType: any;
        serverType: ServerType;
    }

    interface Router {


    }

    interface Server {
        sockets?: any;
        useClass(classType: any, methodType: MethodType): void;
        classRouters: Router[];
        config: IMethodusConfig;
        _send(channel: any, functionArgs: any, message: any, paramsMap?: any): any;
    }

    interface IMethodusConfig {
        classes: Map<string, IMethodusClassConfig>;
        servers?: IServerConfig[]
        port: number;

    }

    interface IServerConfig {
        type: Methodus.ServerType;
        options: any;
    }

    enum MethodType {
        Local = 'Local',
        Http = 'Http',
        MQ = 'MQ',
        Socket = 'Socket',
    }

    enum ServerType {
        Express = 'express',
        RabbitMQ = 'amqp',
        Redis = 'redis',
        Socket = 'socketio'
    }

}