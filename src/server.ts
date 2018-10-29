import 'reflect-metadata';
import { Servers, Express, ExpressPartial, SocketIO, MQ, Redis, RedisServer, Kafka } from './servers';
import { MethodusConfig, ServerConfig, PluginEntry } from './config';
import { ServerType } from './interfaces';
import { MethodEvent } from './response/';
import { fp } from './fp';
import { logger, LogClass } from './log';
import http = require('http');
import colors = require('colors');
import { ClassContainer } from './class-container';
import { PluginLoader } from './plugins';
import { Fastify } from './servers/fastify/fastify';
import * as figlet from 'figlet';
export interface IApp {
    set(key, value);
}

@LogClass(logger)
export class Server {
    public app: any;
    public config: MethodusConfig;
    public serverKey: string;

    private _app: any = {};
    private httpServer: any;
    private port: number = 0;
    private _plugins: PluginEntry[];
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
        return new Promise((resolve, reject) => {

            figlet.text('methodus', {
                font: 'Bigfig',
                horizontalLayout: 'default',
                verticalLayout: 'default',
            }, (err, data) => {
                if (err) {

                    resolve();
                    return;
                }
                console.log(colors.blue(data));
                resolve();
            });
        });
    }

    async start(port?: number) {
        this.port = this.port || port || 0;
        await this.printlogo();
        // add this instance to the global bridge of servers
        // Bridge.set(this.serverKey, { server: this });

        if (this._plugins) {
            const loader = new PluginLoader();
            loader.config(this.config, this._plugins);
        }
        const onStart = []; // [(app) => {}]

        if (this.httpServer) {
            Servers.set(this.instanceId, 'http', this.httpServer);
        }
        if (this.app) {
            Servers.set(this.instanceId, 'express', this.app);
        }

        // we should rearrange the configuration in order to load them in the right order
        // express / http / socketio
        const objectForOrder: any = {};
        this.config.servers.forEach((server: ServerConfig) => {
            if (!objectForOrder[server.type]) {
                objectForOrder[server.type] = [];
            }
            objectForOrder[server.type].push(server);
        });

        const loadOrder = [
            ServerType.HTTP2,
            ServerType.ExpressPartial,
            ServerType.Express,
            ServerType.Socket,
            ServerType.RabbitMQ,
            ServerType.Redis,
            ServerType.Kafka];

        loadOrder.forEach(async (serverFamily: string) => {
            if (objectForOrder[serverFamily] && objectForOrder[serverFamily].length) {
                for (const server of objectForOrder[serverFamily]) {
                    const serverType = server.type;
                    if (server.options.port) {
                        port = server.options.port;
                    }

                    const aServerInstance = Servers.get(this.instanceId, serverType);
                    switch (serverType) {
                        case ServerType.HTTP2:
                            {
                                if (!aServerInstance) {
                                    logger.info(this, colors.red(`> Starting HTTP2 server on port ${port}`));
                                    console.log(colors.red(`> Starting HTTP2 server on port ${port}`));
                                    this._app[serverType] = new Fastify(port, onStart);
                                    const app = Servers.set(this.instanceId, server.type, this._app[serverType]);
                                    this.app = app._app;

                                    const httpServer = Servers.get(this.instanceId, 'http')
                                        || http.createServer(app._app);
                                    this._app.http = httpServer;
                                    Servers.set(this.instanceId, 'http', httpServer);
                                }

                                this.config.servers.forEach((serverConfiguration) => {
                                    if (serverConfiguration.type === serverType && serverConfiguration.onStart) {
                                        onStart.push(serverConfiguration.onStart);
                                    }
                                });
                                break;

                            }
                        case ServerType.Express:
                            {
                                if (!aServerInstance) {// !this.app && !this._app[serverType]) {
                                    logger.info(this, colors.green(`> Starting REST server on port ${port}`));
                                    console.log(colors.green(`> Starting REST server on port ${port}`));
                                    this._app[serverType] = new Express(port, onStart);
                                    const app = Servers.set(this.instanceId, server.type, this._app[serverType]);
                                    this.app = app._app;
                                    const httpServer = Servers.get(this.instanceId, 'http')
                                        || http.createServer(app._app);
                                    this._app.http = httpServer;
                                    Servers.set(this.instanceId, 'http', httpServer);
                                } else {
                                    // express was allready initiated //this._app[serverType] =
                                    const partialExpress = new ExpressPartial(this.app);
                                    Servers.set(this.instanceId, server.type, partialExpress);
                                }

                                this.config.servers.forEach((serverConfiguration) => {
                                    if (serverConfiguration.type === serverType && serverConfiguration.onStart) {
                                        onStart.push(serverConfiguration.onStart);
                                    }
                                });
                                break;

                            }
                        case ServerType.Socket:
                            {
                                logger.info(this, colors.green(`> Starting SOCKETIO server on port ${port}`));
                                console.log(colors.green(`> Starting SOCKETIO server on port ${port}`));

                                const httpServer = Servers.get(this.instanceId, 'http');

                                // if (!httpServer) {
                                //     httpServer = this.httpServer;
                                // }

                                const app = new SocketIO(server.options, httpServer);
                                Servers.set(this.instanceId, server.type, app);
                                // if (server.onStart)
                                //     server.onStart(app);
                                break;
                            }
                        case ServerType.RabbitMQ:
                            {
                                console.log(colors.green(`> Starting MQ server`));
                                logger.info(this, colors.green(`> Starting MQ server`));
                                try {
                                    const app = new MQ(server.options);
                                    Servers.set(this.instanceId, server.type, app);
                                } catch (error) {
                                    logger.error(error);
                                }
                                break;
                            }
                        case ServerType.Kafka:
                            {
                                logger.info(this, colors.green(`> Starting Kafka server`));
                                try {
                                    const app = new Kafka(server.options);
                                    Servers.set(this.instanceId, server.type, app);
                                } catch (error) {
                                    logger.error(error);
                                }
                                break;
                            }
                        case ServerType.Redis:
                            {
                                logger.info(this, colors.green(`> Starting REDIS server`));
                                try {
                                    const app: any = new Redis(server.options);
                                    app.connection = new RedisServer();
                                    Servers.set(this.instanceId, server.type, app);
                                } catch (error) {
                                    logger.error(error);
                                }
                                break;
                            }
                    }
                }
            }
        });

        onStart.forEach((startEvent) => {
            const instance = Servers.get(this.instanceId, "express" /* Express */);
            if (instance && instance._app) {
                startEvent(instance._app);
            }
        });

        // if (onStart) {
        //     const instance = Servers.get(this.instanceId, ServerType.Express);
        //     if (instance && instance._app) {
        //         onStart(instance._app);
        //     }
        // }

        const httpServerIntance = Servers.get(this.instanceId, 'http');
        if (httpServerIntance) {
            httpServerIntance.listen(port);
        }

        const classes = this.config.classes.entries();
        for (let i = 0; i < this.config.classes.size; i++) {
            const element = classes.next();
            this.useClass(element.value[1]);
        }
        return this;
    }

    public useClass(_class) {
        const serverInstance: any = this;
        Object.keys(Servers.instances).forEach((serverId) => {
            const server = Servers.instances[serverId];
            if (_class.classType) {

                const methodusClass = _class.classType;

                const proto = fp.maybeProto(methodusClass);
                const metaObject = ClassContainer.get(proto.methodus.name);

                if (server[_class.serverType]) {
                    metaObject.methodType = _class.methodType;

                    let configName = methodusClass.name;
                    if (!configName && methodusClass.constructor) {
                        configName = methodusClass.constructor.name;
                    }

                    Servers.classes[configName] = _class;
                    if (metaObject) {
                        metaObject.serverType = _class.serverType;
                        metaObject.instanceId = serverInstance.instanceId;
                        ClassContainer.set(proto.methodus.name, metaObject);
                        logger.info(this,
                            colors.blue(`using class ${_class.classType.name} in ${_class.methodType} mode`));

                        const activeServers = Servers.get(serverInstance.instanceId, _class.serverType);
                        if (activeServers) {
                            activeServers.useClass(_class.classType, metaObject.methodType);
                        }
                    } else {
                        logger.error('could not load metadata for ' + proto.methodus.name);
                    }
                }
            }
        });
    }

    public kill() {
        ['http', ServerType.Socket].forEach((server) => {
            if (this._app[server]) {
                this._app[server].close();
                delete this._app[server];
            }
        });
    }

    async _send(channel, params, message, parametersMap, securityContext) {
        return await this._app[channel]._send(params, message, parametersMap, securityContext);
    }

    async registerEvent(channel, eventName) {
        if (this._app[channel].registerEvent) {
            return await this._app[channel].registerEvent(eventName);
        }
    }

    async sendEvent(methodEvent: MethodEvent) {
        this.config.servers.forEach((server) => {
            this._app[server.type]._sendEvent(methodEvent);
        });
    }
}
