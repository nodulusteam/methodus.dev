import 'reflect-metadata';
// <references path='../interfaces/methodus.ts' />
const debug = require('debug')('methodus');
import * as http from 'http';
const metadataKey = 'methodus';
import * as socketIO from 'socket.io';
import { commonsModule as commons, Servers, BaseServer } from '@methodus/server';

/**
 * @hidden
 */
export class SocketIOPlugin extends BaseServer {
    _app: any;
    constructor(options: any, httpServer: any) {
        super();
        this.classRouters = [];

        if (httpServer) {
            this._app = socketIO(httpServer);
        } else {
            this._app = socketIO.listen(options.port, { transports: ['polling', 'websocket'] });
        }

        (global as any).socketioEngine = this._app;
        let nsp = this._app;
        if (options && options.nsp) {
            nsp = this._app.of(options.nsp);
        }

        nsp.on('connection', (socket: any) => {
            this.socketHandler(socket);
        });

        nsp.use((socket: any, next: any) => {
            next();
        });
    }
    close() {
        this._app.close();
    }
    useClass(classType: any) {
        this.classRouters.push(classType);
    }

    socketHandler(socket: any) {
        if (!socket.attached) {
            this.classRouters.forEach((item: any) => {
                return new SocketIORouter(item, socket);
            });
            socket.attached = true;
        }
    }
    public static register(server: any, parentServer: any) {
        console.log(`> Starting SOCKETIO server`);
        const httpServer = Servers.get(server.instanceId, 'http') || http.createServer(parentServer._app);

        Servers.set(server.instanceId, 'http', httpServer);

        const app = new SocketIOPlugin(server.options, httpServer);
        Servers.set(server.instanceId, server.type.name, app);
    }

    // async send(functionArgs: any, methodus: any, paramsMap: any) {
    //     return new Promise(async (resolve, reject) => {
    //         debug('sending data in socket', functionArgs, methodus, paramsMap);

    //         const dataObject: any = {};
    //         functionArgs.forEach((element: any, index: any) => {
    //             dataObject[paramsMap.filter((item: any) => {
    //                 return item.index === index;
    //             })[0].name] = element;
    //         });

    //         const myUri = await methodus.resolver();
    //         const socket = require('socket.io-client')(myUri);
    //         socket.on('connect', () => {
    //             debug('socket connection ok');
    //             const messageName = methodus.verb + '_' + methodus.route;
    //             debug('messageName:method:recipient', messageName);
    //             socket.emit(messageName, dataObject, (data: any) => {
    //                 debug('recieved result', data);
    //                 if (data.error && data.statusCode) {
    //                     //logger.error(data);
    //                     reject(data);
    //                 } else {
    //                     //logger.info('return value is', data);
    //                     resolve(data);
    //                 }
    //             });
    //         });
    //     });
    // }
}

/**
 * @hidden
 */
export class SocketIORouter {
    prefix: string = '';
    public router: any = null;
    constructor(obj: any, socket: any) {
        const proto = commons.util.maybeProto(obj);
        const methodus = commons.util.maybeMethodus(obj)[obj.name];

        const existingClassMetadata = Reflect.getOwnMetadata(metadataKey, proto) || {};
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);

        Object.keys(methodus._descriptors).forEach((itemKey) => {
            const item = methodus._descriptors[itemKey];
            debug('activating controller method', item, methodus);
            //logger.info(`registering socket event`, item.verb + '_' + item.route);

            socket.on(item.verb + '_' + item.route, async (data: any, callback: any) => {
                // parse params
                debug('activating controller method', itemKey, data);

                const paramsMap: any[] = Reflect.getOwnMetadata('params', proto, itemKey) || [];
                debug('method params', itemKey, paramsMap);
                const functionArgs: any = [];

                methodus._descriptors[itemKey].params.forEach((xitem: any) => {
                    functionArgs[xitem.index] = data[xitem.name];
                });

                try {
                    const result = await proto[itemKey](...functionArgs, socket, data);
                    debug('result is:', result);
                    callback(result);
                } catch (error) {
                    callback(error);
                }
            });
        });
    }
}
