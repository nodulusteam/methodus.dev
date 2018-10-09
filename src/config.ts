const yaml = require('js-yaml'),
    fs = require('fs');

import { logger, Log, LogClass } from './log';

const metadataKey = 'methodus';
import { MethodType, ServerType } from './interfaces';


export const enum Verbs {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Head = 'HEAD',
    Delete = 'DELETE',

}



export interface MethodDescriptor {
    verb: Verbs;
    route: string;
    methodType: MethodType;
    propertyKey: string;
    middlewares?: any;
    params: any[]
}



export interface EventDescriptor extends MethodDescriptor {
    name: string;
    value?: any;
    exchange?: string;

}



@LogClass(logger)
export class MethodusClassConfig {
    /**
     *
     */
    constructor(classType: any, methodType: MethodType, serverType: ServerType, resolver?: Promise<any> | Function | string | any) {
        this.classType = classType;
        this.methodType = methodType;
        this.serverType = serverType;
        this.resolver = () => {
            return resolver;
        }

    }
    public methodType: MethodType = MethodType.Local;
    public serverType: ServerType;
    public classType: any;
    public serviceName: string;
    public resolver: Promise<any> | Function | string | any | string
}
export interface PluginEntry {
    name: string;
    options: any;
}

@LogClass(logger)
export class MethodusConfig {
    constructor(servers?: ServerConfig[], map?: Map<string, MethodusClassConfig>) {
        if (servers)
            this.servers = servers;

        if (map)
            this.classes = map;
    }
    public classes: Map<string, MethodusClassConfig> = new Map<string, MethodusClassConfig>();
    public servers: ServerConfig[];
    public plugins: PluginEntry[];
    public port: number;
    public use(classType: any, methodType: MethodType, serverType: ServerType, resolver?: Promise<any> | Function | string | any) {
        if (methodType === MethodType.Http && !resolver)
            throw (new Error('Http transport requires a resolver, pass in a string or a promise'));

        let configEntry = new MethodusClassConfig(classType, methodType, serverType, resolver);
        this.classes.set(classType.name, configEntry);

        if (classType.methodus) {
            this.classes.set(classType.methodus.name, configEntry);
        }
    }
    public run(serverType: ServerType, configuration: any) {
        this.servers = this.servers || [];
        this.servers.push(new ServerConfig(serverType, configuration))


    }
}

@LogClass(logger)
export class ServerConfig {
    constructor(type: ServerType, options?: any) {
        this.type = type;
        this.options = options;
        if (options) {
            this.onStart = options.onStart;
        }

    }
    type: ServerType | any;
    options: any;
    onStart?: Function;
}



export class MethodusConfigurations {
    static _configurations: any;
    public static add(configurationInstance) {
        this._configurations = configurationInstance;
    }

    public static get() {
        return this._configurations;
    }
}

export class ConnectionOptions {
    amqp;
    name;
    userName;
    password;
}

export function MethodusConfigFromFile(configPath) {
    var doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    return doc;
}
