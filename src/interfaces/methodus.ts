
export interface IMethodusClassConfig {
    methodType: MethodType;
    classType: any;
    serverType: ServerType;
}

export interface Router {


}

export interface IServer {
    sockets?: any;
    useClass(classType: any, methodType: MethodType): void;
    classRouters: Router[];
    config: IMethodusConfig;
    _send(channel: any, functionArgs: any, message: any, paramsMap?: any): any;
}

export interface IMethodusConfig {
    classes: Map<string, IMethodusClassConfig>;
    servers?: IServerConfig[]
    port: number;

}

export interface IServerConfig {
    type: ServerType;
    options: any;
}

export const enum MethodType {
    Local = 'Local',
    Http = 'Http',
    Http2 = 'Http2',
    MQ = 'MQ',
    Redis = 'Redis',
    Socket = 'Socket',
    Kafka = 'Kafka',
    Mock = 'Mock'
}

export const enum ServerType {
    Express = 'express',
    ExpressPartial = 'express',
    RabbitMQ = 'amqp',
    Redis = 'redis',
    Socket = 'socketio',
    Kafka = 'kafka',
    HTTP2 = 'http2'

}

