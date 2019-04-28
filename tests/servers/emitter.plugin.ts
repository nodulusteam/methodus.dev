
import 'reflect-metadata';
import * as colors from 'colors';
import { Servers } from '../../src/servers/serversList';
import { logger, LogClass } from '../../src/log';
import { EventEmitter } from 'events';
import { fp } from '../../src';
const metadataKey = 'methodus';

export const sharedEmitter: EventEmitter = new EventEmitter();
export const resultEmitter: EventEmitter = new EventEmitter();
@LogClass(logger)
export class CustomMessageRouter {
    prefix: string = '';

    constructor(obj: any) {
        const proto = fp.maybeProto(obj);
        const methodus = fp.maybeMethodus(obj)[obj.name];

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
                    logger.error(error);
                }
            });
        });
    }
}

export class CustomMessageServer {
    useClass(classType: any, methodType: any) {
        return new CustomMessageRouter(classType);
    }
    sendMessage(verb: any, route: any, params: any, paramsMap: any, securityContext: any) {
        sharedEmitter.emit(`${verb}_${route}`, { params, securityContext });
    }
}
export function register(server: any, parentServer: any) {
    logger.info(this, colors.green(`> Starting Custom server`));
    console.log(colors.green(`> Starting Custom ${server.type.name} server`));
    const app = new CustomMessageServer();
    Servers.set(server.instanceId, server.type.name, app);
}
const messageServer: CustomMessageServer = new CustomMessageServer();
export async function send(methodus: any, functionArgs: any, paramsMap: any, securityContext: any) {
    return await messageServer.sendMessage(methodus.verb, methodus.route, functionArgs,
        paramsMap, securityContext);
}
