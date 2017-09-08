
import { Container } from '../container';


import { logger, Log, LogClass } from '../log/';
import { MethodError } from '../response'
import { ConnectionOptions } from "../config";

const amqp = Container.get('amqplib');

export class AMQP {
    private static _connection;
    @Log(logger)
    public static async connect(connectionOptions: ConnectionOptions, forceReconnect?: boolean) {
        if (this._connection && !forceReconnect) {
            logger.log(this, 'reusing connection');
            return Promise.resolve(this._connection)
        }
        try {
            this._connection = await amqp.connect('amqp://' + connectionOptions.amqp + '?heartbeat=30&router=' + connectionOptions.name);
            return this._connection;
        } catch (error) {
            throw (new MethodError(error));
        }
    }

}

