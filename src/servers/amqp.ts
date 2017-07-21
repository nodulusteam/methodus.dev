const amqp = require('amqplib');


export async function amqpConnect() {

    if (global.methodulus.amqp) {
        return Promise.resolve(global.methodulus.amqp)
    }
    // return new Promise(async (resolve, reject) => {
    //  try {
    return amqp.connect('amqp://localhost').then((conn) => {
        global.methodulus.amqp = conn;
        console.log('i am connection', conn);
        return conn;

    }).catch((error) => {

        console.log(error);
    });
    // let channel = await conn.createChannel()//(function (err, ch) {
    // var q = 'hello';

    // channel.assertQueue(q, { durable: false });
    // // Note: on Node 6 Buffer.from(msg) should be used
    // channel.sendToQueue(q, new Buffer('Hello World!'));
    // console.log(" [x] Sent 'Hello World!'");
    // resolve(conn);
    //   });
    //});

    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // });


}