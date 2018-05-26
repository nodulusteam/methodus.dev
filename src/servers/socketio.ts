// <references path='../interfaces/methodus.ts' />
const debug = require('debug')('tmla:methodus');

import 'reflect-metadata';
import { MethodError, MethodResult, MethodEvent } from '../response';
import { Router,IServer } from '../interfaces';

import { fp } from '../fp';
import { BaseServer } from './base';
let metadataKey = 'methodus';
import { logger, Log, LogClass } from '../log';

@LogClass(logger)
export class SocketIO extends BaseServer {
    _app: any;
    constructor(options, httpServer) {
        super();
        this.classRouters = [];
        var io: IServer;
        if (httpServer)
            this._app = require('socket.io')(httpServer);
        else
            this._app = require('socket.io').listen(options.port);

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
                new SocketIORouter(item, socket);
            });
            socket.attached = true;
        }


    }
    async _sendEvent(methodEvent: MethodEvent) {

    }
    async _send(functionArgs, methodus, paramsMap) {
        return new Promise(async (resolve, reject) => {
            debug('sending data in socket', functionArgs, methodus, paramsMap);

            var dataObject = {};
            functionArgs.forEach((element, index) => {
                dataObject[paramsMap.filter((item) => {
                    return item.index === index;
                })[0].name] = element;
            });


            let myUri = await methodus.resolver();
            var socket = require('socket.io-client')(myUri);
            socket.on('connect', () => {
                debug('socket connection ok');
                let messageName = methodus.verb + '_' + methodus.route;
                debug('messageName:method:recipient', messageName);
                socket.emit(messageName, dataObject, (data) => {
                    debug('recieved result', data);
                    if (data.error && data.statusCode) {
                        logger.error(data)
                        reject(data);
                    }
                    else {
                        logger.info('return value is', data)
                        resolve(data);

                    }
                });
            });
        });
    }

}

@LogClass(logger)
export class SocketIORouter implements Router {
    public router: any;
    constructor(obj: any, socket: any) {
        let proto = fp.maybeProto(obj);
        let methodus = fp.maybeMethodus(obj);

        let existingClassMetadata = Reflect.getOwnMetadata(metadataKey, proto) || {};
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);

        Object.keys(methodus._descriptors).forEach(itemKey => {
            let item = methodus._descriptors[itemKey];
            debug('activating controller method', item, methodus);
            logger.info(this, `registering socket event`, item.verb + '_' + item.route);

            socket.on(item.verb + '_' + item.route, async (data, callback) => {
                //parse params
                debug('activating controller method', itemKey, data);

                let paramsMap: any[] = Reflect.getOwnMetadata('params', proto, itemKey) || [];
                debug('method params', itemKey, paramsMap);
                let functionArgs: any = [];


                methodus._descriptors[itemKey].params.forEach((item) => {
                    functionArgs[item.index] = data[item.name];
                })



                try {
                    let result = await proto[itemKey](...functionArgs, socket, data);
                    debug('result is:', result)
                    callback(result);
                } catch (error) {
                    callback(error);
                }

            });
        });
    }
}
