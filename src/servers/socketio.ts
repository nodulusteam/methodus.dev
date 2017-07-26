
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodError, MethodResult } from '../response';
import { fp } from '../fp';
import { BaseServer } from './base';
let metadataKey = 'methodulus';


export class SocketIO extends BaseServer {
    _app: any;
    constructor(port, httpServer) {

        super();
        this.classRouters = [];
        var io: Methodulus.Server;
        if (httpServer)
            this._app = require("socket.io")(httpServer);
        else
            this._app = require("socket.io").listen(port);


        this._app.sockets.on("connection", (socket) => {
            this.socketHandler(socket);
        });






    }
    close() {
        this._app.close();
    }
    useClass(classType) {
        this.classRouters.push(classType);
    }

    socketHandler(socket) {
        this.classRouters.forEach((item) => {
            new SocketIORouter(item, socket);
        })

    }

    async _send(functionArgs, methodulus, paramsMap) {
        return new Promise(async (resolve, reject) => {
            debug('sending data in socket', functionArgs, methodulus, paramsMap);

            var dataObject = {};
            functionArgs.forEach((element, index) => {
                dataObject[paramsMap.filter((item) => {
                    return item.index === index;
                })[0].name] = element;
            });


            let myUri = await methodulus.resolver();
            var socket = require('socket.io-client')(myUri);
            socket.on('connect', () => {
                debug('socket connection ok');
                let messageName = methodulus.verb + '_' + methodulus.route;
                debug('messageName:method:recipient', messageName);
                socket.emit(messageName, dataObject, (data) => {
                    debug('recieved result', data);
                    if (data.error && data.statusCode) {
                        reject(data.error);
                    }
                    else {
                        resolve(data);

                    }
                });
            });
        });
    }

}


export class SocketIORouter implements Methodulus.Router {
    public router: any;
    constructor(obj: any, socket: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;

        Object.keys(methodulus._descriptors).forEach(itemKey => {
            let item = methodulus._descriptors[itemKey];
            debug('activating controller method', item, methodulus);
            socket.on(item.verb + '_' + item.route, async (data, callback) => {
                //parse params
                debug('activating controller method', itemKey, data);

                let paramsMap: any[] = Reflect.getOwnMetadata('params', proto, itemKey) || [];
                debug('method params', itemKey, paramsMap);
                let functionArgs: any = [];


                paramsMap.forEach((item) => {
                    functionArgs[item.index] = data[item.name];
                })



                try {
                    let result = await proto[itemKey](...functionArgs);
                    debug('result is:', result)
                    callback(result);
                } catch (error) {
                    callback(error);
                }

            });
        });
    }
}