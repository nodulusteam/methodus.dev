import 'reflect-metadata';
import { Servers } from './servers';
import commons, { MethodusConfig, ServerConfig, PluginEntry } from '@methodus/framework-decorators/commons';
import { MethodHandler } from './method/handlers/method.handler';
import { MethodPipeHandler } from './method/handlers/pipe.handler';
import { PluginLoader } from './plugins';
import injection from '@methodus/framework-decorators/injection';
import { v1 as uuidv1 } from 'uuid';

export interface IApp {
    set(key: string, value: any): void;
}

export class Server {
    public app: any;
    public config?: MethodusConfig;
    public serverKey: string;

    public _app: any = {};
    public httpServer: any;
    public httpsServer: any;
    public port: number = 0;
    public ipAddress: string = '0.0.0.0';
    private _plugins: PluginEntry[] = [];
    public instanceId: string;

    public methodHandler?: MethodHandler | null;
    public methodPipeHandler?: MethodPipeHandler | null;

    constructor(port?: number | string, app?: any, httpServer?: any) {
        if (port) {
            this.port = +port || 0;
        }
        this.app = app;
        this.httpServer = httpServer;
        this.serverKey = this.makeid();
        this.instanceId = Servers.addServer(this);
        //bind handlers
        try{
            this.methodHandler = injection.Injector.resolve<MethodHandler>('MethodHandler');
            this.methodPipeHandler = injection.Injector.resolve<MethodPipeHandler>('MethodPipeHandler');
        }catch(error){
            throw(new Error('missing MethodHandler are you using a platform package?'))
        }
    }

    makeid() {
        return uuidv1();
    }

    plugins(plugins: PluginEntry[]) {
        this._plugins = plugins;
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
            Servers.clients[configName] = _class;

            if (metaObject) {
                metaObject.methodType = _class.transportType.name;
                injection.ClassContainer.set(configName, metaObject);
                commons.logger
                    .info(`using client class ${_class.classType.name} in ${_class.transportType.name} mode`);

            } else {
                commons.logger.error('could not load metadata for ' + configName);
            }
        }
    }

    async start() {
        this.port = 0;
        console.log(`> Methodus.`);
        // add this instance to the global bridge of servers
        // Bridge.set(this.serverKey, { server: this });

        if (this.config && this._plugins && this._plugins.length > 0) {
            const loader = new PluginLoader();
            await loader.config(this.config, this._plugins);
        }
        const onStart: any[] = [];
        if (this.httpServer) {
            Servers.set(this.instanceId, 'http', this.httpServer);
        }
        if (this.httpsServer) {
            Servers.set(this.instanceId, 'https', this.httpsServer);
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
                    return new injection.ServerContainer(server, this);
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

            this.httpServer = Servers.get(this.instanceId, 'http');
            if (this.httpServer && this.port) {
                this.httpServer.listen(this.port, this.ipAddress);
            }

            this.httpsServer = Servers.get(this.instanceId, 'https');
            if (this.httpsServer && this.port) {
                this.httpsServer.listen(this.port, this.ipAddress);
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
                const metaObject = injection.ClassContainer.get(configName);
                const serverTypeName = _class.serverType.name || _class.serverType;
                if (server[serverTypeName]) {
                    Servers.classes[configName] = _class;
                    if (metaObject) {
                        metaObject.methodType = _class.methodType;
                        metaObject.serverType = _class.serverType;
                        metaObject.instanceId = serverInstance.instanceId;
                        injection.ClassContainer.set(configName, metaObject);

                        commons.logger.info(
                            `using server class ${configName} in ${_class.methodType} mode`);

                        const activeServers = Servers.get(serverInstance.instanceId, serverTypeName);
                        if (activeServers) {
                            activeServers.useClass(_class.classType, metaObject.methodType);
                        }
                    } else {
                        commons.logger.error('could not load metadata for ' + configName);
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
