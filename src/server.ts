import 'reflect-metadata';
import { Servers, Express, ExpressRouter, ExpressPartial, SocketIO, MQ, Redis, RedisServer, Kafka } from './servers';
import { MethodusConfig, MethodusConfigFromFile, ServerConfig, MethodusClassConfig, PluginEntry } from './config';
import { MethodType, ServerType } from './interfaces';
import { MethodEvent } from './response/';
import { fp } from './fp'
let metadataKey = 'methodus';
import { logger, Log, LogClass, LogLevel } from './log';
import http = require('http');
import colors = require('colors');
import { ClassContainer } from './class-container';
import { PluginLoader } from './plugins';
import { Fastify } from './servers/fastify';

export interface IApp {
    set(key, value);
}

const figlet = require('figlet');

@LogClass(logger)
export class Server {
    public app: any;//IApp;
    private _app: any = {};//IApp;
    private httpServer: any;
    private port: number = 0;
    private _plugins: PluginEntry[];
    public config: MethodusConfig;
    private instanceId: string;
    public serverKey: string;


    constructor(port?: number | string, app?: any, httpServer?: any) {
        if (port)
            this.port = +port || 0;

        this.app = app;
        this.httpServer = httpServer;
        this.serverKey = this.makeid();
        this.instanceId = Servers.addServer(this);

        //this.start(port);
    }
    @Log()
    makeid() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }



    @Log()
    plugins(plugins: PluginEntry[]) {
        this._plugins = plugins;
        return this;
    }
    @Log()
    configure(config: MethodusConfig) {
        this.config = config
        return this;
    }
    @Log()
    async printlogo() {
        return new Promise((resolve, reject) => {

            figlet.text('methodus', {
                font: 'Bigfig',//Delta Corps Priest 1
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, function (err, data) {
                if (err) {

                    resolve();
                    return;
                }
                console.log(colors.blue(data));
                resolve();
            });


        })
    }

    @Log()
    async start(port?: number) {
        this.port = this.port || port || 0;
        await this.printlogo();
        // add this instance to the global bridge of servers
        // Bridge.set(this.serverKey, { server: this });

        if (this._plugins) {
            const loader = new PluginLoader();
            loader.config(this.config, this._plugins);
        }

        let onStart: Function = null;


        if (this.httpServer) {
            Servers.set(this.instanceId, 'http', this.httpServer);
        }
        if (this.app) {
            Servers.set(this.instanceId, 'express', this.app);
        }

        //we should rearrange the configuration in order to load them in the right order
        // express / http / socketio
        let objectForOrder: any = {};
        this.config.servers.forEach((server: ServerConfig) => {
            if (!objectForOrder[server.type]) {
                objectForOrder[server.type] = [];
            }
            objectForOrder[server.type].push(server);
        })

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
                for (let i = 0; i < objectForOrder[serverFamily].length; i++) {
                    let server = objectForOrder[serverFamily][i];
                    let serverType = server.type;

                    if (server.options.port) {
                        port = server.options.port;
                    }




                    const aServerInstance = Servers.get(this.instanceId, serverType)
                    switch (serverType) {
                        case ServerType.HTTP2:
                            {
                                if (!aServerInstance) {
                                    logger.info(this, colors.red(`> Starting HTTP2 server on port ${port}`));
                                    console.log(colors.red(`> Starting HTTP2 server on port ${port}`));
                                    this._app[serverType] = new Fastify(port, onStart);
                                    let app = Servers.set(this.instanceId, server.type, this._app[serverType]);
                                    this.app = app._app;

                                    const httpServer = Servers.get(this.instanceId, 'http') || http.createServer(app._app);
                                    this._app['http'] = httpServer;
                                    //listen on provided ports

                                    Servers.set(this.instanceId, 'http', httpServer);
                                }


                                this.config.servers.forEach((serverConfiguration) => {
                                    if (serverConfiguration.type === serverType && serverConfiguration.onStart)
                                        onStart = serverConfiguration.onStart;
                                })
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
                                    const httpServer = Servers.get(this.instanceId, 'http') || http.createServer(app._app);
                                    this._app['http'] = httpServer;
                                    //listen on provided ports
                                    Servers.set(this.instanceId, 'http', httpServer);
                                }
                                else {
                                    //express was allready initiated //this._app[serverType] = 
                                    const partialExpress = new ExpressPartial(this.app);
                                    Servers.set(this.instanceId, server.type, partialExpress);
                                }

                                this.config.servers.forEach((serverConfiguration) => {
                                    if (serverConfiguration.type === serverType && serverConfiguration.onStart)
                                        onStart = serverConfiguration.onStart;
                                })
                                break;

                            }
                        case ServerType.Socket:
                            {
                                logger.info(this, colors.green(`> Starting SOCKETIO server on port ${port}`));
                                console.log(colors.green(`> Starting SOCKETIO server on port ${port}`));

                                let httpServer = Servers.get(this.instanceId, 'http');

                                // if (!httpServer) {
                                //     httpServer = this.httpServer;
                                // }

                                let app = new SocketIO(server.options, httpServer);
                                Servers.set(this.instanceId, server.type, app);
                                // if (server.onStart)
                                //     server.onStart(app);
                                break;
                            }
                        case ServerType.RabbitMQ:
                            {
                                console.log(colors.green(`> Starting MQ server`));
                                logger.info(this, colors.green(`> Starting MQ server`))
                                try {
                                    let app = new MQ(server.options);
                                    Servers.set(this.instanceId, server.type, app);
                                } catch (error) {
                                    logger.error(error);
                                }
                                break;
                            }
                        case ServerType.Kafka:
                            {
                                logger.info(this, colors.green(`> Starting Kafka server`))
                                try {
                                    let app = new Kafka(server.options);
                                    Servers.set(this.instanceId, server.type, app);
                                } catch (error) {
                                    logger.error(error);
                                }
                                break;
                            }
                        case ServerType.Redis:
                            {
                                logger.info(this, colors.green(`> Starting REDIS server`))
                                try {
                                    let app: any = new Redis(server.options);
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


        if (onStart) {
            const instance = Servers.get(this.instanceId, ServerType.Express);
            if (instance && instance._app) {
                onStart(instance._app);
            }

        }

        let httpServerIntance = Servers.get(this.instanceId, 'http');
        if (httpServerIntance) {
            httpServerIntance.listen(port);
        }



        let classes = this.config.classes.entries()
        for (let i = 0; i < this.config.classes.size; i++) {
            let name, element = classes.next();
            this.useClass(element.value[1]);
        }





        return this;
    }






    @Log()
    public useClass(_class) {
        let serverInstance: any = this;




        //this.config.servers
        Object.keys(Servers.instances).forEach((serverId) => {
            const server = Servers.instances[serverId];
            if (_class.classType) {

                const methodusClass = _class.classType;

                let proto = fp.maybeProto(methodusClass);
                let metaObject = ClassContainer.get(proto.methodus.name);

                if (server[_class.serverType]) {
                    metaObject.methodType = _class.methodType;

                    //extract metadata for class and method
                    let configName = methodusClass.name;
                    if (!configName && methodusClass.constructor)
                        configName = methodusClass.constructor.name;


                    Servers.classes[configName] = _class;


                    if (metaObject) {
                        metaObject.instanceId = serverInstance.instanceId;
                        ClassContainer.set(proto.methodus.name, metaObject);
                        logger.info(this, colors.blue(`using class ${_class.classType.name} in ${_class.methodType} mode`));

                        const activeServers = Servers.get(serverInstance.instanceId, _class.serverType);
                        if (activeServers) {
                            activeServers.useClass(_class.classType, metaObject.methodType);
                        }
                    } else {
                        logger.error('could not load metadata for ' + proto.methodus.name);
                    }
                }
            }

        })




    }

    @Log()
    public kill() {
        ['http', ServerType.Socket].forEach((server) => {
            if (this._app[server]) {
                this._app[server].close();
                delete this._app[server];
            }
        });
    }
    @Log()
    async _send(channel, params, message, parametersMap, securityContext) {
        return await this._app[channel]._send(params, message, parametersMap, securityContext);
    }

    @Log()
    async registerEvent(channel, eventName) {
        if (this._app[channel].registerEvent)
            return await this._app[channel].registerEvent(eventName);
    }


    @Log()
    async sendEvent(methodEvent: MethodEvent) {
        this.config.servers.forEach((server) => {
            this._app[server.type]._sendEvent(methodEvent);
        });

    }

}
