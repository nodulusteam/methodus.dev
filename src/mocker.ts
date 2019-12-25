import { MethodusClientConfig } from './config/client-config';
import { TransportType } from './interfaces';
import { Injectable } from './di';
import { ParserResponse } from './transports/rest/rest';

export class Mocker {
    public static mock(target: any) {
        // get the bridge
        const bridge = (global as any).METHODUS_BRIDGE;
        const configEntry = new MethodusClientConfig(target, TransportType.Mock);
        bridge.clients[target.name] = configEntry;
        return bridge;
    }

    public static mockServer(target: any) {
        // get the bridge
        const bridge = (global as any).METHODUS_BRIDGE;
        const configEntry = new MethodusClientConfig(target, TransportType.Mock);
        target.prototype.methodus[target.name].serverType = 'Mockserver';
        bridge.classes[target.name] = configEntry;
        return bridge;
    }

}

@Injectable('ParserForMockserver')
export class Parser {
    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {
        return new ParserResponse(functionArgs, false, {});
    }

}
@Injectable('ResponseForMockserver')
export class Response {

    handle() {
        return;
    }

}
