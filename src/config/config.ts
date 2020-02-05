
import { MethodType, ServerType, TransportType } from '../interfaces';
import { MethodusClassConfig } from './class-config';
import { MethodusClientConfig } from './client-config';
import { ServerConfig } from './server-config';
import { ServerDefinition } from '../decorators';

export interface PluginEntry {
    name: string;
    options: any;
}

export class MethodusConfig {

    public classes: Map<string, MethodusClassConfig> = new Map<string, MethodusClassConfig>();
    public servers?: ServerConfig[];
    public clients: Map<string, MethodusClientConfig> = new Map<string, MethodusClientConfig>();
    public plugins?: PluginEntry[];
    public port: number = 0;

    constructor(servers?: ServerConfig[], map?: Map<string, MethodusClassConfig>) {
        if (servers) {
            this.servers = servers;
        }

        if (map) {
            this.classes = map;
        }
    }

    public useClient(classType: any, transportType: TransportType,
        resolver?: Promise<any> | string | any) {
        if (transportType === TransportType.Http && !resolver) {
            throw (new Error('Http transport requires a resolver, pass in a string or a promise'));
        }

        const configEntry = new MethodusClientConfig(classType, transportType, resolver);
        this.clients.set(classType.name, configEntry);

    }

    public use(classType: any, methodType: MethodType,
        serverType: ServerType, resolver?: Promise<any> | string | any) {
        if (methodType === MethodType.Http && !resolver) {
            throw (new Error('Http transport requires a resolver, pass in a string or a promise'));
        }

        const configEntry = new MethodusClassConfig(classType, methodType, serverType, resolver);
        this.classes.set(classType.name, configEntry);
    }

    public run(serverType: ServerDefinition, configuration: any) {
        this.servers = this.servers || [];
        this.servers.push(new ServerConfig(serverType, configuration));
    }
}
/**
 * @hidden
 */
export class MethodusConfigurations {
    static _configurations: any;
    public static add(configurationInstance: any) {
        this._configurations = configurationInstance;
    }

    public static get() {
        return this._configurations;
    }
}
