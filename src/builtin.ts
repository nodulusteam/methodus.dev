
import * as express from 'express';

export class BuiltInServers {
    public static Express: any = { name: 'express', path: './servers/express', static: express.static };
    public static HTTP2 = { name: 'Http2', path: './servers/fastify/fastify' };
    public static Socket = { name: 'Socket', path: './servers/socketio' };
    public static RabbitMQ = { name: 'RabbitMQ', path: './servers/rabbitmq' };
    public static Redis = { name: 'Redis', path: './servers/redis' };
    public static Kafka = { name: 'Kafka', path: './servers/kafka' };
}

export class BuiltInTransports {
    public static Http = { name: 'Http', path: './transports/rest' };
    public static Http2 = { name: 'Http2', path: './transports/rest' };
    public static Socket = { name: 'Socket', path: './transports/socketio' };
}
