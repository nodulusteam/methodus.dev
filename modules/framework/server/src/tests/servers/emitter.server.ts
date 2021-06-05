import * as path from 'path';
import decorators from '@methodus/framework-decorators';
import injection from '@methodus/framework-decorators/injection';
import { TestController } from '../controllers/';
import { TestTarget } from '../controllers/';
import { EmitterPlugin } from './emitter.plugin';
import { MethodResult, MethodError } from '@methodus/framework-decorators/commons';
import { ConfiguredServer } from '../../server.configured';
import { deserialize } from '../../method/deserialize';

const ServerPlugin = new EmitterPlugin();
/**
 * @hidden
 */
@decorators.PluginConfiguration(path.join(__dirname, 'simple.plugin'))
@decorators.ServerConfiguration(ServerPlugin, {})
@decorators.RouterConfiguration(TestController, ServerPlugin)
@decorators.ClientConfiguration(TestTarget, ServerPlugin)
export class EmitterTestServer extends ConfiguredServer {
    constructor() {
        super(EmitterTestServer);
    }
}

/**
 * @hidden
 */
@injection.Injectable('ParserForPlugin')
export class ParserForPlugin {
    /**
     *
     */
    constructor() {}
    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {
        functionArgs = functionArgs || [];
        paramsMap.forEach((item: any) => {
            let value = null;
            const typeForDeserialization = item.actualType.odm ? item.actualType : item.type;
            value = deserialize({ value: args[item.index], type: typeForDeserialization });
            functionArgs.push(value);
        });
        return new ParserResponse(functionArgs, false, {});
    }
}

/**
 * @hidden
 */
@injection.Injectable('ResponseForPlugin')
export class EmitterResponse {
    public handle(args: any, methodResult: MethodResult | MethodError | any, headers: any) {
        return methodResult;
    }
}
export class ParserResponse {
    args: any;
    isRest: boolean;
    securityContext: any;
    constructor(args: any, isRest: boolean, securityContext: any) {
        this.args = args;
        this.isRest = false;
        this.securityContext = securityContext;
    }
}
