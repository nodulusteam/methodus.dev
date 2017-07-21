const debug = require('debug')('methodulus');
import "reflect-metadata";

const amqp = require('amqplib');
export async function MQ() {
    var io: any = null;
    try {
        let conn = await amqp.connect('amqp://localhost');
        let channel = await conn.createChannel()//(function (err, ch) {
        var q = 'hello';

        channel.assertQueue(q, { durable: false });
        // Note: on Node 6 Buffer.from(msg) should be used
        channel.sendToQueue(q, new Buffer('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");
        //   });
        //});

    }
    catch (error) {
        console.log(error);
    }
}

MQ();