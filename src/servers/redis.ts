const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodResult, MethodError } from '../response';
import { BaseServer } from './base';
const redis = require('redis');
import { fp } from '../fp';
const redis_addr = '//192.168.99.100:32768';


export class Redis extends BaseServer {
    classRouters: Methodulus.Router[];
    options: any;
    constructor(options) {
        super();
        this.options = options;
    }

    useClass(classType) {
        new RedisRouter(classType);

    }
    async _send(functionArgs, methodinformation, paramsMap) {
        console.log(methodinformation);
        return new Promise((resolve, reject) => {
            let pub = redis.createClient(this.options.server);
            let sub = redis.createClient(this.options.client);
            var corr = generateUuid();
            sub.subscribe(corr);
            sub.on('message', (destination, msg) => {
                if (corr == destination) {
                    resolve(fp.maybeJson(msg));
                }
            });

            //  amqpConnect().then((conn) => {

            //  conn.createChannel().then((ch) => {
            var q = methodinformation.name;
            let methodMessage = new MethodMessage();
            methodMessage.to = methodinformation.propertyKey;
            methodMessage.metadata = methodinformation;
            methodMessage.message = paramsMap;
            methodMessage.args = functionArgs;
            methodMessage.correlationId = corr;

            pub.publish(methodinformation.name, JSON.stringify(methodMessage));
            // let stringMessage = JSON.stringify(methodMessage);

            // ch.assertQueue('', { exclusive: true }).then((q) => {
            //     var corr = generateUuid();
            //     ch.consume(q.queue, (msg) => {

            //         if (msg.properties.correlationId == corr) {
            //             resolve(fp.maybeJson(msg.content.toString()));

            //             // console.log(' [.] Got %s', msg.content.toString());
            //             //setTimeout(function() { conn.close(); process.exit(0) }, 500);
            //         }
            //     }, { noAck: true });

            //     ch.sendToQueue(methodinformation.name,
            //         new Buffer(stringMessage),
            //         { correlationId: corr, replyTo: q.queue });
            // });
            // });


            // conn.createChannel().then((ch) => {
            //     var q = methodinformation.name;
            //     let methodMessage = new MethodMessage();
            //     methodMessage.to = methodinformation.propertyKey;
            //     methodMessage.metadata = methodinformation;
            //     methodMessage.message = paramsMap;
            //     methodMessage.args = functionArgs;
            //     let stringMessage = JSON.stringify(methodMessage);
            //     ch.assertQueue(q, { durable: false });
            //     // Note: on Node 6 Buffer.from(msg) should be used
            //     ch.sendToQueue(q, new Buffer(stringMessage));
            //     resolve(q);
            // });


            // })




        });
    }
}
// export function Redis(port, httpServer) {
//     let io: Methodulus.Server = {};

//     //return new Promise((resolve, reject) => {
//     io.classRouters = Methodulus.Router[];




//     io.useClass = function (classType) {
//         new RedisRouter(classType);

//     }

//     io._send = async (functionArgs, methodinformation, paramsMap) => {
//         console.log(methodinformation);
//         return new Promise((resolve, reject) => {
//             let pub = redis.createClient(redis_addr);
//             let sub = redis.createClient(redis_addr);
//             var corr = generateUuid();
//             sub.subscribe(corr);
//             sub.on('message', (destination, msg) => {
//                 if (corr == destination) {
//                     resolve(new MethodResult(fp.maybeJson(msg)));
//                 }
//             });

//             //  amqpConnect().then((conn) => {

//             //  conn.createChannel().then((ch) => {
//             var q = methodinformation.name;
//             let methodMessage = new MethodMessage();
//             methodMessage.to = methodinformation.propertyKey;
//             methodMessage.metadata = methodinformation;
//             methodMessage.message = paramsMap;
//             methodMessage.args = functionArgs;
//             methodMessage.correlationId = corr;

//             pub.publish(methodinformation.name, JSON.stringify(methodMessage));
//             // let stringMessage = JSON.stringify(methodMessage);

//             // ch.assertQueue('', { exclusive: true }).then((q) => {
//             //     var corr = generateUuid();
//             //     ch.consume(q.queue, (msg) => {

//             //         if (msg.properties.correlationId == corr) {
//             //             resolve(fp.maybeJson(msg.content.toString()));

//             //             // console.log(' [.] Got %s', msg.content.toString());
//             //             //setTimeout(function() { conn.close(); process.exit(0) }, 500);
//             //         }
//             //     }, { noAck: true });

//             //     ch.sendToQueue(methodinformation.name,
//             //         new Buffer(stringMessage),
//             //         { correlationId: corr, replyTo: q.queue });
//             // });
//             // });


//             // conn.createChannel().then((ch) => {
//             //     var q = methodinformation.name;
//             //     let methodMessage = new MethodMessage();
//             //     methodMessage.to = methodinformation.propertyKey;
//             //     methodMessage.metadata = methodinformation;
//             //     methodMessage.message = paramsMap;
//             //     methodMessage.args = functionArgs;
//             //     let stringMessage = JSON.stringify(methodMessage);
//             //     ch.assertQueue(q, { durable: false });
//             //     // Note: on Node 6 Buffer.from(msg) should be used
//             //     ch.sendToQueue(q, new Buffer(stringMessage));
//             //     resolve(q);
//             // });


//             // })




//         });
//     }



//     return io;
// }
function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}

export class MethodMessage {
    to: string;
    message: any;
    metadata: any;
    args: any;
    correlationId: string;
}

let metadataKey = 'methodulus';
export class RedisServer {
    connection: any = null;
    constructor() {
        // amqpConnect().then((connection) => {
        //     this.connection = connection


        // });
    }


}
export class RedisRouter implements Methodulus.Router {
    public router: any;
    constructor(obj: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;
        let pub = redis.createClient(redis_addr);
        let sub = redis.createClient(redis_addr);


        //amqpConnect().then((conn) => {
        //  conn.createChannel().then((ch) => {
        let q = methodulus.name;
        sub.subscribe(q);
        sub.on('message', async (destination, msg) => {
            let parsedMessage = fp.maybeJson(msg) as MethodMessage;
            let result = await proto[parsedMessage.to](...parsedMessage.args);
            console.log('the local result is', result);

            pub.publish(parsedMessage.correlationId, JSON.stringify(result));
        });
    }
}


