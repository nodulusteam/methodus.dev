const yaml = require('js-yaml'),
    fs = require('fs');
import { logger, Log, LogClass } from './log/';


import { Verbs } from './rest';

export interface EventDescriptor extends MethodDescriptor {
    name: string;
    value?: any;

}

export interface MethodDescriptor {
    verb?: Verbs;
    route?: string;
    methodType?: MethodType;
    propertyKey: string;
}

export enum MethodType {
    Local = 'Local',
    Http = 'Http',
    MQ = 'MQ',
    Redis = 'Redis',
    Socket = 'Socket',
    Kafka = 'Kafka'
}

@LogClass(logger)
export class MethodulusClassConfig implements Methodulus.IMethodulusClassConfig {
    /**
     *
     */

    constructor(classType: any, methodType: MethodType, resolver?: Function | string) {
        this.classType = classType;
        this.methodType = methodType;
        this.resolver = () => {
            if (typeof resolver === 'string') {
                return Promise.resolve(resolver);
            } else {
                if (resolver)
                    return resolver(classType.name);
            }
        }

    }
    public methodType: string = MethodType.Local;
    public classType: any;
    public resolver: Function | string
}

export class MethodulusConfigurations {
    static _configurations: any;
    public static add(configurationInstance) {
        this._configurations = configurationInstance;
    }

    public static get() {
        return this._configurations;
    }
}


@LogClass(logger)
export class MethodulusConfig implements Methodulus.IMethodulusConfig {
    constructor(servers?: ServerConfig[], map?: Map<string, MethodulusClassConfig>) {



        if (servers)
            this.servers = servers;

        if (map)
            this.classes = map;







        MethodulusConfigurations.add(this);
    }
    public classes: Map<string, Methodulus.IMethodulusClassConfig> = new Map<string, Methodulus.IMethodulusClassConfig>();
    public servers?: ServerConfig[];;
    public port?: number;

    @Log()
    public use(classType: any, methodType: MethodType, resolver?: Function | string) {
        if (methodType === MethodType.Http && !resolver)
            throw (new Error('Http transport requires a resolver, pass in a string or a promise'))
        if (!this.classes)
            this.classes = new Map<string, MethodulusClassConfig>();

        this.classes.set(classType.name, new MethodulusClassConfig(classType, methodType, resolver));
    }

    @Log()
    public run(serverType: ServerType, configuration: any) {
        this.servers = this.servers || [];
        this.servers.push(new ServerConfig(serverType, configuration))


    }
}


@LogClass(logger)
export class ServerConfig {
    constructor(type: ServerType, options: any) {
        this.type = type;
        this.options = options;
    }
    type: ServerType;
    options: any;
}

export function MethodulusConfigFromFile(configPath) {
    var doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    return doc;
}

export enum ServerType {
    Express = 'express',
    RabbitMQ = 'amqp',
    Redis = 'redis',
    Socket = 'socketio',
    Kafka = 'kafka'
}


export class ConnectionOptions {
    amqp;
    name;
}