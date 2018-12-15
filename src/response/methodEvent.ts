import { logger, LogClass } from '../log/';
import { Servers } from '../servers';
import { ServerType } from '../';
@LogClass(logger)
export class MethodEvent {

    public static emit(name: string, value: any, serverType?: ServerType, exchangeName?: string | string[]) {
        const event = new MethodEvent(name, value, serverType, exchangeName);
        return event;
    }

    name: string;
    value: any;
    exchange: string;
    exchanges: string[];
    serverType: ServerType = ServerType.RabbitMQ;

    constructor(name: string, value: any, serverType?: ServerType, exchangeName?: string | string[]) {
        this.value = value;
        this.name = name;
        this.exchanges = Array.isArray(exchangeName) ? exchangeName : [exchangeName];

        if (serverType) {
            this.serverType = serverType;
        }

        Servers.emit(this);
    }
}
