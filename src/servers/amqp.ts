const amqp = require('amqplib');
import { logger, Log, LogClass } from '../log/';
import { MethodError } from '../response'



export class AMQP {
    private static _connection;
    @Log(logger)
    public static async connect(connectionOptions,forceReconnect?:boolean) {
        if (this._connection && !forceReconnect) {
            logger.log(this, 'reusing connection');
            return Promise.resolve(this._connection)
        }
        return amqp.connect('amqp://' + connectionOptions.amqp).then((conn) => {
            logger.log(this, 'opening connection to');
            this._connection = conn;
            return this._connection;
        }).catch((error) => {
            throw (new MethodError(error));
        });

    }

}

