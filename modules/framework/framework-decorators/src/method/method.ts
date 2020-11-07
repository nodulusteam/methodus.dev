import 'reflect-metadata';
import injection from '@methodus/framework-injection';
const methodMetadataKey = 'methodus';
/** the @Method decorator registers route listeners
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */
export function Method(
    verb?: string,
    route?: string,
    middlewares?: Function[]
) {
    return (
        target: any,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        target.methodus = target.methodus || {};
        const name = target.name || target.constructor.name;
        target.methodus[name] = target.methodus[name] || {
            _auth: {},
            _events: {},
            _descriptors: {},
        };

        target.methodus = target.methodus || {};

        const mTarget = target.methodus[name];

        const metaObject = Object.assign(
            {},
            { verb, route, propertyKey, middlewares, params: [] }
        );
        if (mTarget._descriptors[propertyKey]) {
            Object.assign(metaObject, {
                params: mTarget._descriptors[propertyKey].params,
            });
        }

        Reflect.defineMetadata(
            methodMetadataKey,
            metaObject,
            target,
            propertyKey
        );
        mTarget._descriptors[propertyKey] = metaObject as any;
        const paramsMap: any[] = metaObject.params;
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        });

        const methodHandler = injection.Injector.resolve<typeof target>('MethodHandler');
        return methodHandler.methodDecorator.apply(this, [
            target,
            propertyKey,
            descriptor,
            verb,
            route,
            middlewares,
        ]);
    };
}
