import { TransportType,MethodusClientConfig } from '@methodus/framework-decorators/commons';
import injection from '@methodus/framework-decorators/injection';


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
        target.prototype.methodus[target.name].serverType = { name: 'Mockserver' };
        bridge.classes[target.name] = configEntry;
        return bridge;
    }

}

@injection.Injectable('ParserForMockserver')
export class Parser {
    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {
        return new ParserResponse(functionArgs, false, {});
    }

}
@injection.Injectable('ResponseForMockserver')
export class Response {

    handle() {
        return;
    }

}

class ParserResponse {
    args: any;
    isRest: boolean;
    securityContext: any;
    constructor(args: any, isRest: boolean, securityContext: any) {
        this.args = args;
        this.isRest = isRest;
        this.securityContext = securityContext;
    }
}