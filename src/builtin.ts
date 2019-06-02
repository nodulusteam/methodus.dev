
import * as express from 'express';

export class BuiltInServers {
    public static Express: any = { name: 'express', path: './servers/express', static: express.static };
    public static Socket = { name: 'Socket', path: './servers/socketio' };
}

export class BuiltInTransports {
    public static Http = { name: 'Http', path: './transports/rest' };
    public static Http2 = { name: 'Http2', path: './transports/rest' };
    public static Socket = { name: 'Socket', path: './transports/socketio' };
}
