
import 'reflect-metadata';
import { Servers } from '@methodus/server';
import commons, { ITransport } from '@methodus/server/commons';
import { EventEmitter } from 'events';

const metadataKey = 'methodus';
/**
 * @hidden
 */
export const sharedEmitter: EventEmitter = new EventEmitter();
export const resultEmitter: EventEmitter = new EventEmitter();
/**
 * @hidden
 */
export class CustomMessageRouter {
    prefix: string = '';

    constructor(obj: any) {
        const proto = commons.util.maybeProto(obj);
        const methodus = commons.util.maybeMethodus(obj)[obj.name];

        const existingClassMetadata = Reflect.getOwnMetadata(metadataKey, proto) || {};
        existingClassMetadata.returnMessages = true;
        Reflect.defineMetadata(metadataKey, existingClassMetadata, proto);

        Object.keys(methodus._descriptors).forEach((itemKey) => {
            const item = methodus._descriptors[itemKey];

            sharedEmitter.on(item.verb + '_' + item.route, async (data: any, callback: any) => {
                const functionArgs: any = [];
                methodus._descriptors[itemKey].params.forEach((xitem: any) => {
                    functionArgs[xitem.index] = data.params[xitem.name];
                });
                try {
                    const result = await proto[itemKey](...functionArgs, data.securityContext);
                    resultEmitter.emit(itemKey, result);
                } catch (error) {
                    commons.logger.error(error);
                }
            });
        });
    }
}

/**
 * @hidden
 */
export class CustomMessageServer {
    useClass(classType: any, methodType: any) {
        return new CustomMessageRouter(classType);
    }
    sendMessage(verb: any, route: any, params: any, paramsMap: any, securityContext: any) {
        sharedEmitter.emit(`${verb}_${route}`, { params, securityContext });
    }
}

export class EmitterPlugin implements ITransport {
    name: string = 'Plugin';

    public register(server: any, parentServer: any): void {
        commons.logger.info(`> Starting Custom ${server.type.name} server`);

        const app = new CustomMessageServer();
        Servers.set(server.instanceId, server.type.name, app);
    }
    public async send(methodus: any, functionArgs: any, paramsMap: any, securityContext: any): Promise<any> {
        return messageServer.sendMessage(methodus.verb, methodus.route, functionArgs,
            paramsMap, securityContext);
    }
}

// @Injectable('ParserForPlugin')
// export class Parser {
//     parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {
//         return new ParserResponse(functionArgs, false, {});
//     }

// }
// @Injectable('ResponseForPlugin')
// export class Response {

//     handle() {
//         return;
//     }

// }

const messageServer: CustomMessageServer = new CustomMessageServer();
