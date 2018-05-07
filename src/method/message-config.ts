

import 'reflect-metadata';
import { logger } from '../log';
import { ClassContainer } from '../class-container';
let metadataKey = 'methodus';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} workQueueName - an array of middlewares to apply to this controller}
 */
export function MessageConfig(name: string, workQueueName?: string) {
    return function (target: any) {
        let existingMetadata = ClassContainer.get(name) || {};
        existingMetadata.name = name
        let proto = target.prototype || target.__proto__;

        if (target.methodus) //means its a static class , no prototype
            proto = target;
        proto.methodus.name = name;
        proto.methodus.workQueueName = workQueueName;
        ClassContainer.set(name, existingMetadata);

    }
}
