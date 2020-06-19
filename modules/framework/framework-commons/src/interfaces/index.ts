
export interface IMethodusClassConfig {
    methodType: MethodType;
    classType: any;
    serverType: ServerType;
}
export interface Router {
    prefix: string;
}

export type Dictionary<T = any> = { [key: string]: T };

export type ClassNoArgs = { new(): any };
export type ClassArgs = { new(...args: any[]): any };
export type ClassRef = ClassNoArgs | ClassArgs;

export type ModuleTargetClass = {
    new(): any,
    imports?: ClassRef[];
    declarations?: ClassRef[];
    providers?: ClassRef[];
    exports?: ClassRef[];
};


export enum AuthType {
    None,
    Basic,
    ApiKey,
    BearerToken,
    DigestAuth
}


export interface ITransport {
    name: string;
    register(server: any, parentServer: any): void;
    send(methodus: any, functionArgs: any, paramsMap: any, securityContext: any): Promise<any>;

}

export interface IServer {
    classRouters: any[];
    config: IMethodusConfig;
    sockets?: any;
    useClass(classType: any, methodType: MethodType): void;
    _send(channel: any, functionArgs: any, message: any, paramsMap?: any): any;
}

export interface IMethodusConfig {
    classes: Map<string, IMethodusClassConfig>;
    servers?: IServerConfig[];
    port: number;

}

export interface IServerConfig {
    type: ServerType;
    options: any;
}

export enum TransportType {
    Http = 'Http',
    MQ = 'MQ',
    Redis = 'Redis',
    Socket = 'Socket',
    Kafka = 'Kafka',
    Mock = 'Mock',
    Custom = 'Custom',
}

export enum MethodType {
    Local = 'Local',
    Http = 'Http',
    Http2 = 'Http2',
    MQ = 'MQ',
    Redis = 'Redis',
    Socket = 'Socket',
    Kafka = 'Kafka',
    Mock = 'Mock',
}

export enum ServerType {
    Express = 'express',

    RabbitMQ = 'amqp',
    Redis = 'redis',
    Socket = 'Socket',
    Kafka = 'kafka',
    HTTP2 = 'Http2',
    Custom = 'Custom',

}


export interface ServerDefinition {
    name: string;
    path?: string;
    static?: any;
    module?: any;
    parser?: any;
    response?: any;
}

/**
 * @hidden
 */
export interface MethodDescriptor {
    verb: string;
    route: string;
    methodType: MethodType;
    propertyKey: string;
    middlewares?: any;
    params: any[];
}

/**
 * @hidden
 */
export interface EventDescriptor extends MethodDescriptor {
    name: string;
    value?: any;
    exchange?: string;
}
