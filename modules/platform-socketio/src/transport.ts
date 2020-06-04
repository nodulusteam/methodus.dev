import { logger } from '@methodus/framework-commons';
/**
 * @hidden
 */
export function send(methodus: any, functionArgs: any, paramsMap: any, securityContext: any) {
    return new Promise(async (resolve, reject) => {
        const dataObject: any = {};
        functionArgs.forEach((element: any, index: any) => {
            dataObject[
                paramsMap.filter((item: any) => {
                    return item.index === index;
                })[0].name
            ] = element;
        });

        const myUri = await methodus.resolver();
        const socket = require('socket.io-client')(myUri);
        socket.on('connect', () => {
            const messageName = methodus.verb + '_' + methodus.route;
            socket.emit(messageName, dataObject, (data: any) => {
                socket.close();
                if (data.error && data.statusCode) {
                    logger.error(data);
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    });
}
