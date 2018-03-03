import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'
import { ServerType } from '../'
@LogClass(logger)
export class MethodEvent {
    name: string;
    value: any;
    exchange: string;
    exchanges: Array<string>;
    serverType: ServerType = ServerType.RabbitMQ;
    constructor(name: string, value: any, serverType?: ServerType, exchangeName?: string | Array<string>) {
        this.value = value;
        this.name = name;
        this.exchanges = Array.isArray(exchangeName) ? exchangeName : [exchangeName];

        if (serverType)
            this.serverType = serverType;

        Servers.emit(this);
    }

    public static emit(name: string, value: any, serverType?: ServerType, exchangeName?: string | Array<string>) {
        new MethodEvent(name, value, serverType, exchangeName);

    }

}


