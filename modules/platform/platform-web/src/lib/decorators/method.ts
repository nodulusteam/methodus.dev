import { MethodDescriptor, MethodType, ParamsMap, Verbs } from '../commons/';
import { Rest } from '../transports/rest';
import { Socket } from '../transports/socket';


/** the @Method decorator registers the model with the odm
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */

export function Method(verb: Verbs, route: string) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {


        target.methodus = target.methodus || {};
        let nameKey = target.name || target.constructor.name;
        target.methodus[nameKey] = target.methodus[nameKey] || { _events: {}, _descriptors: {} };

        let mTarget = target.methodus[nameKey];

        let metaObject: MethodDescriptor = Object.assign({}, { verb, route, propertyKey, params: [] });
        if (mTarget._descriptors[propertyKey]) {
            metaObject = Object.assign(metaObject, { params: mTarget._descriptors[propertyKey].params });
        }

        mTarget._descriptors[propertyKey] = metaObject; // as MethodDescriptor;
        let paramsMap: ParamsMap[];
        if (metaObject.params) {
            paramsMap = metaObject.params;
            paramsMap.sort((a: any, b: any) => {
                return a.index - b.index;
            });
        }

        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            let childMethodus = null;
            if (args.length > 0 && args[args.length - 1] && args[args.length - 1].methodus) {
                childMethodus = args[args.length - 1].methodus;
                args.splice(args.length - 1, 1);
            }

            let name = target.name;
            if (target.constructor) {
                name = target.constructor.name;
            }

            if (target._symbol) {
                name = target._symbol;
            }          

            let config = { methodType: MethodType.Http };
            if ((window as any).METHODUS_CONFIG) {

                config = (window as any).METHODUS_CONFIG[name];
                if (!config) {
                    config = { methodType: MethodType.Http };
                }
            }


            if (args[args.length - 1] && args[args.length - 1].instruct) {
                mTarget = args[args.length - 1].target;

                metaObject = mTarget._descriptors[propertyKey];
                paramsMap = metaObject.params as any;
                paramsMap.sort((a: any, b: any) => {
                    return a.index - b.index;
                });
            }


            const methodus: any = mTarget;
            // merge the configuration object
            Object.assign(methodus, methodus._descriptors[propertyKey]);
            // acquire the method information from the config classes map
            const completeConfiguration: any = Object.assign({}, methodus, config);
            switch (config.methodType) {
                case MethodType.Mock:
                case MethodType.Local:
                    return await originalMethod.apply(target, args);
                case MethodType.Socket:
                    const socket = new Socket();
                    const messageName = `${completeConfiguration.verb}_${completeConfiguration.route}`;
                    await socket.send(messageName, args);
                    return socket;
                case MethodType.Http:
                    let finalRoute = completeConfiguration.route;
                    //include base routes
                    if (childMethodus && childMethodus.baseRoute) {
                        finalRoute = childMethodus.baseRoute + finalRoute;
                    }


                    if (target.methodus && target.methodus[name] && target.methodus[name].baseRoute) {
                        finalRoute = target.methodus[name].baseRoute + finalRoute;
                    }



                    if (target.base !== undefined) {
                        finalRoute = target.base + finalRoute;
                    } else if ((window as any).RELATIVE_CONTRACTS) {
                        finalRoute = '.' + finalRoute;
                    }

                    const request = new Rest(finalRoute, completeConfiguration.verb, paramsMap, args);
                    const result = await request.send();
                    return result;
            }
        };
        return descriptor;
    };
}
