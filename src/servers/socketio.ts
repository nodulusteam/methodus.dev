import 'reflect-metadata';
// <references path='../interfaces/methodus.ts' />
const debug = require('debug')('methodus');
import * as Methodus from '../interfaces/';
import { MethodEvent } from '../response';
import { fp } from '../fp';
import { BaseServer } from './base';
const metadataKey = 'methodus';
import { logger, LogClass } from '../log';
import * as socketIO from 'socket.io';

@LogClass(logger)
export class SocketIO extends BaseServer {
    _app: any;
    constructor(options, httpServer) {
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

        nsp.on('connection', (socket) => {
            this.socketHandler(socket);
        });

        nsp.use((socket, next) => {
            next();
        });

    }
    close() {
        this._app.close();
    }
    useClass(classType) {
        this.classRouters.push(classType);
    }

    socketHandler(socket) {
        if (!socket.attached) {
            this.classRouters.forEach((item) => {
                const socketServer = new SocketIORouter(item, socket);
            });
            socket.attached = true;
        }

    }
    async _sendEvent(methodEvent: MethodEvent) {
        const mymethodEvent = methodEvent;
    }
    async _send(functionArgs, methodus, paramsMap) {
        return new Promise(async (resolve, reject) => {
            debug('sending data in socket', functionArgs, methodus, paramsMap);

            const dataObject = {};
            functionArgs.forEach((element, index) => {
                dataObject[paramsMap.filter((item) => {
                    return item.index === index;
                })[0].name] = element;
            });

            const myUri = await methodus.resolver();
            const socket = require('socket.io-client')(myUri);
            socket.on('connect', () => {
                debug('socket connection ok');
                const messageName = methodus.verb + '_' + methodus.route;
                debug('messageName:method:recipient', messageName);
                socket.emit(messageName, dataObject, (data) => {
                    debug('recieved result', data);
                    if (data.error && data.statusCode) {
                        logger.error(data);
                        reject(data);
                    } else {
                        logger.info('return value is', data);
                        resolve(data);
                    }
                });
            });
        });
    }
}

@LogClass(logger)
export class SocketIORouter implements Methodus.Router {
    prefix: string;
    public router: any;
    constructor(obj: any, socket: any) {
        const proto = fp.maybeProto(obj);
        const methodus = fp.maybeMethodus(obj)[obj.name];

        const existingClassMetadata = Reflect.getOwnMetadata(metadataKey, proto) || {};
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);

        Object.keys(methodus._descriptors).forEach((itemKey) => {
            const item = methodus._descriptors[itemKey];
            debug('activating controller method', item, methodus);
            logger.info(this, `registering socket event`, item.verb + '_' + item.route);

            socket.on(item.verb + '_' + item.route, async (data, callback) => {
                // parse params
                debug('activating controller method', itemKey, data);

                const paramsMap: any[] = Reflect.getOwnMetadata('params', proto, itemKey) || [];
                debug('method params', itemKey, paramsMap);
                const functionArgs: any = [];

                methodus._descriptors[itemKey].params.forEach((xitem) => {
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
