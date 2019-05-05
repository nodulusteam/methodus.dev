
import { MethodError } from '../../src/response/';
import { ConnectionOptions } from './connection-options';
const amqp = require('amqplib');
import { logger } from '../../src/log';
export class AMQP {
    public static async connect(connectionOptions: ConnectionOptions, forceReconnect?: boolean) {
        if (AMQP._connection && !forceReconnect) {
            try {
                const connection = await AMQP._connection;
                return connection;
            } catch (ex) {
                logger.error(ex);
            }

        }
        try {
            console.log(`> connecting to amqp server at ${connectionOptions.amqp}`);
            const connectionString = `amqp://${connectionOptions.userName}:${
                connectionOptions.password}@${connectionOptions.amqp}`
                + '?heartbeat=30&router=' + connectionOptions.name;

            AMQP._connection = amqp.connect(connectionString);
            // first set the promise so theconnec function preseves a single connection

            AMQP._connection = await AMQP._connection; // now revive it

            AMQP._connection.on('error', () => { AMQP._connection = null; });
            AMQP._connection.on('close', () => { AMQP._connection = null; });

            return AMQP._connection;
        } catch (error) {
            throw (new MethodError(error));
        }
    }
    private static _connection: any;
}
