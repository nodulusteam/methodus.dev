
const debug = require('debug')('methodulus');
import "reflect-metadata";

export function SocketIO(port, httpServer) {
    var io: any = null;
    if (httpServer)
        io = require("socket.io")(httpServer);
    else
        io = require("socket.io").listen(port);



    io.classRouters = [];
    io.sockets.on("connection", function (socket) {
        socketHandler(socket);

    });

    function socketHandler(socket) {
        io.classRouters.forEach((item) => {
            new SocketIORouter(item, socket);
        })

    }

    io.useClass = function (classType) {
        io.classRouters.push(classType);
    }

    io._send = async (functionArgs, methodulus, paramsMap) => {
        return new Promise(function (resolve, reject) {
            debug('sending data in socket', functionArgs, methodulus, paramsMap);
            let myUri = methodulus.endpoint;
            var socket = require('socket.io-client')(myUri);
            socket.on('connect', function () {
                let messageName = methodulus.verb + '_' + methodulus.route;
                socket.emit(messageName, functionArgs, (data) => {
                    resolve(data);
                    debug('recieved result', data);
                });
            });



        });

    }
    return io;

}


let metadataKey = 'methodulus';

export class SocketIORouter {
    public router: any;
    constructor(obj: any, socket: any) {
        let proto = obj.prototype || obj.__proto__;
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
                proto[itemKey].bind(obj);
                let result = await proto[itemKey](...functionArgs);
                debug('result is:', result)
                callback(result);
            });
        });
    }
}