
import * as express from 'express';
/**
 * Servers built into Methodus
 * @public
 */
export class BuiltInServers {
    /**
     * Express backed server
     * @public
     */
    public static Express: any = { name: 'express', path: './servers/express', static: express.static };
    /**
     * SocketIO backed server
     * @public
     */
    public static Socket = { name: 'Socket', path: './servers/socketio' };
}
