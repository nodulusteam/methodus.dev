import 'reflect-metadata';
import { Clients } from './clients-list';
import commons, { MethodusConfig, ServerConfig, PluginEntry } from '@methodus/framework-commons';

// import { PluginLoader } from './plugins';
import injection from '@methodus/framework-injection';
import { v1 as uuidv1 } from 'uuid';
import { MethodHandler } from './method/method.handler';

export interface IApp {
    set(key: string, value: any): void;
}

@injection.Singleton('MethodusServer')
export class Server {
    public app: any;
    public config?: MethodusConfig;
    public serverKey: string;
    public _app: any = {};
    private instanceId: string;

    constructor() {
        this.serverKey = this.makeid();
        this.instanceId = Clients.addServer(this);
        //bind handlers
        const handler: MethodHandler | null = injection.Injector.get<MethodHandler>('MethodHandler');
        console.log(handler);
    }

    makeid() {
        return uuidv1();
    }

    plugins(plugins: PluginEntry[]) {
        return this;
    }

    configure(config: MethodusConfig) {
        this.config = config;
        return this;
    }

    public useClient(_class: any) {
        if (_class.classType) {
            const methodusClass = _class.classType;
            let configName = methodusClass.name;
            if (!configName && methodusClass.constructor) {
                configName = methodusClass.constructor.name;
            }
            const metaObject = injection.ClassContainer.get(configName);
            _class.transportType = new injection.ClientContainer(_class.transportType);
            Clients.clients[configName] = _class;

            if (metaObject) {
                metaObject.methodType = _class.transportType.name;
                injection.ClassContainer.set(configName, metaObject);
                commons.logger.info(`using client class ${_class.classType.name} in ${_class.transportType.name} mode`);
            } else {
                commons.logger.error('could not load metadata for ' + configName);
            }
        }
    }

    async start() {

        if (this.config && this.config.servers) {
            this.config.servers.forEach((server: ServerConfig) => {
                const aServerInstance = Clients.get(this.instanceId, server.type.name);
                if (!aServerInstance) {
                    server.instanceId = this.instanceId;
                    return new injection.ServerContainer(server, this);
                } else {
                    return aServerInstance;
                }
            });
        }
        if (this.config) {
            const clients = this.config.clients.entries();
            for (let i = 0; i < this.config.clients.size; i++) {
                const element = clients.next();
                this.useClient(element.value[1]);
            }
        }
        return this;
    }

    public kill() {
        Clients.serversArray.forEach((server: any) => {
            if (server && server.close) {
                server.close();
            }
        });
        Clients.reset();
    }
}
