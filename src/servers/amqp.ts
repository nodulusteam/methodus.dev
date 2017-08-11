const amqp = require('amqplib');
import { logger, Log, LogClass } from '../log/';
export async function amqpConnect() {
    if (global.methodulus.amqp) {
        return Promise.resolve(global.methodulus.amqp)
    }
    return amqp.connect('amqp://127.0.0.1').then((conn) => {
        global.methodulus.amqp = conn;
        return conn;
    }).catch((error) => {
        console.log(error);
    });

}