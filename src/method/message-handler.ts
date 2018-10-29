import 'reflect-metadata';
import { EventDescriptor } from '../config';

const metadataKey = 'methodus';

/** the model decorator registers the model with the odm
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */
export function MessageHandler(name: string, exchange: string) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target.methodus = target.methodus || { _workevents: {}, _events: {}, _descriptors: {} };
        const metaObject: EventDescriptor = { name, propertyKey, exchange } as EventDescriptor;
        Reflect.defineMetadata(metadataKey, metaObject, target, propertyKey);
        target.methodus._events[name] = metaObject;
        return descriptor;
    };
}
