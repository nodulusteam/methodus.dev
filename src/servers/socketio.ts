
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodError, MethodResult, MethodEvent } from '../response';
import { fp } from '../fp';
import { BaseServer } from './base';
let metadataKey = 'methodulus';
import { logger, Log, LogClass } from '../log/';

@LogClass(logger)
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
    async _sendEvent(methodEvent: MethodEvent) {

    }
    async _send(functionArgs, methodulus, paramsMap) {
        return new Promise(async (resolve, reject) => {
         

            var dataObject = {};
            functionArgs.forEach((element, index) => {
                dataObject[paramsMap.filter((item) => {
                    return item.index === index;
                })[0].name] = element;
            });


            let myUri = await methodulus.resolver();
            var socket = require('socket.io-client')(myUri);
            socket.on('connect', () => {
            
                let messageName = methodulus.verb + '_' + methodulus.route;
            
                socket.emit(messageName, dataObject, (data) => {
                  
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
export class SocketIORouter implements Methodulus.Router {
    public router: any;
    constructor(obj: any, socket: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;

        let existingClassMetadata = Reflect.getOwnMetadata(metadataKey, proto) || {};
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);

        Object.keys(methodulus._descriptors).forEach(itemKey => {
            let item = methodulus._descriptors[itemKey];
          
            socket.on(item.verb + '_' + item.route, async (data, callback) => {
                //parse params
            

                let paramsMap: any[] = Reflect.getOwnMetadata('params', proto, itemKey) || [];
             
                let functionArgs: any = [];


                paramsMap.forEach((item) => {
                    functionArgs[item.index] = data[item.name];
                })



                try {
                    let result = await proto[itemKey](...functionArgs);
                  
                    callback(result);
                } catch (error) {
                    callback(error);
                }

            });
        });
    }
}