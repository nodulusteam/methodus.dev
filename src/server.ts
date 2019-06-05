import 'reflect-metadata';
import { Servers } from './servers';
import { MethodusConfig, ServerConfig, PluginEntry } from './config';
import { logger, LogClass } from './log';
import * as colors from 'colors';
import { ClassContainer } from './class-container';
import { PluginLoader } from './plugins';
import * as figlet from 'figlet';
import { ServerContainer } from './server-container';
import { ClientContainer } from './client-container';
export interface IApp {
    set(key: string, value: any): void;
}
@LogClass(logger)
export class Server {
    public app: any;
    public config?: MethodusConfig;
    public serverKey: string;

    public _app: any = {};
    private httpServer: any;
    private port: number = 0;
    private _plugins: PluginEntry[] = [];
    private instanceId: string;

    constructor(port?: number | string, app?: any, httpServer?: any) {
        if (port) {
            this.port = +port || 0;
        }

        this.app = app;
        this.httpServer = httpServer;
        this.serverKey = this.makeid();
        this.instanceId = Servers.addServer(this);
    }

    makeid() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    plugins(plugins: PluginEntry[]) {
        this._plugins = plugins;
        return this;
    }

    configure(config: MethodusConfig) {
        this.config = config;
        return this;
    }

    async printlogo() {

        const options: any = {
            font: 'Bigfig',
            horizontalLayout: 'default',
            verticalLayout: 'default',
        };
        console.log(figlet.textSync('methodus', options));
    }

    public useClient(_class: any) {
        if (_class.classType) {

            const methodusClass = _class.classType;
            let configName = methodusClass.name;
            if (!configName && methodusClass.constructor) {
                configName = methodusClass.constructor.name;
            }
            const metaObject = ClassContainer.get(configName);
            _class.transportType = new ClientContainer(_class.transportType);
            Servers.clients[configName] = _class;

            if (metaObject) {
                metaObject.methodType = _class.transportType.name;
                ClassContainer.set(configName, metaObject);
                logger.info(
                    colors.blue(`using class ${_class.classType.name} in ${_class.transportType.name} mode`));

            } else {
                logger.error('could not load metadata for ' + configName);
            }
        }
    }

    async start() {
        this.port = 0;
        await this.printlogo();
        // add this instance to the global bridge of servers
        // Bridge.set(this.serverKey, { server: this });

        if (this.config && this._plugins && this._plugins.length > 0) {
            const loader = new PluginLoader();
            await loader.config(this.config, this._plugins);
        }
        const onStart: any = [];
        if (this.httpServer) {
            Servers.set(this.instanceId, 'http', this.httpServer);
        }
        if (this.app) {
            Servers.set(this.instanceId, 'express', this.app);
        }

        if (this.config && this.config.servers) {
            this.config.servers.forEach((server: ServerConfig) => {

                if (server.options && server.options.port) {
                    this.port = server.options.port;
                }
                if (server.onStart) {
                    onStart.push(server.onStart);
                }

                const aServerInstance = Servers.get(this.instanceId, server.type.name);
                if (!aServerInstance) {
                    server.instanceId = this.instanceId;
                    return new ServerContainer(server, this);
                } else {
                    return aServerInstance;
                }
            });

            onStart.forEach((startEvent: any) => {
                const instance = Servers.get(this.instanceId, 'express' /* Express */);
                if (instance && instance._app) {
                    startEvent(instance._app);
                }
            });

            const httpServerIntance = Servers.get(this.instanceId, 'http');
            if (httpServerIntance) {
                httpServerIntance.listen(this.port);
            }

        }
        if (this.config) {

            const classes = this.config.classes.entries();
            for (let i = 0; i < this.config.classes.size; i++) {
                const element = classes.next();
                this.useClass(element.value[1]);
            }

            const clients = this.config.clients.entries();
            for (let i = 0; i < this.config.clients.size; i++) {
                const element = clients.next();
                this.useClient(element.value[1]);
            }
        }
        return this;
    }

    public useClass(_class: any) {
        const serverInstance: any = this;
        Object.keys(Servers.instances).forEach((serverId: any) => {
            const server = Servers.instances[serverId];
            if (_class.classType) {

                const methodusClass = _class.classType;
                let configName = methodusClass.name;
                if (!configName && methodusClass.constructor) {
                    configName = methodusClass.constructor.name;
                }
                const metaObject = ClassContainer.get(configName);
                const serverTypeName = _class.serverType.name || _class.serverType;
                if (server[serverTypeName]) {
                    Servers.classes[configName] = _class;
                    if (metaObject) {
                        metaObject.methodType = _class.methodType;
                        metaObject.serverType = serverTypeName;
                        metaObject.instanceId = serverInstance.instanceId;
                        ClassContainer.set(configName, metaObject);
                        logger.info(
                            colors.blue(`using class ${_class.classType.name} in ${_class.methodType} mode`));

                        const activeServers = Servers.get(serverInstance.instanceId, serverTypeName);
                        if (activeServers) {
                            activeServers.useClass(_class.classType, metaObject.methodType);
                        }
                    } else {
                        logger.error('could not load metadata for ' + configName);
                    }
                }
            }
        });
    }

    public kill() {
        Servers.serversArray.forEach((server: any) => {
            if (server && server.close) {
                server.close();
            }
            // if (this._app[server]) {
            //     this._app[server].close();
            //     delete this._app[server];
            // }
        });
        Servers.reset();
    }

}
