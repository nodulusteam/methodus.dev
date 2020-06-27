import { fp, MethodType, Injector } from '@methodus/server';
import * as protobuf from 'protobufjs';
import { ReflectionObject } from 'protobufjs';

export class gRpcRouter {
    public routers: any = [];
    constructor(obj: any, methodType: MethodType, app: any) {

        let keyName = obj.name;
        if (!keyName) {
            keyName = obj.constructor.name;
        }
        obj = Injector.get(keyName);

        const methodus = fp.maybeMethodus(obj)[keyName];
        const globalMiddlewares: any[] = [];
        if (methodus.middlewares) {
            methodus.middlewares.forEach((element: any) => {
                if (element) {
                    globalMiddlewares.push(element);
                } else {
                    // logger.error('could not load middleware');
                }
            });
        }

        const routerDataObject: any = {};
        //create service entry
        const service = new protobuf.Service(methodus.name);

        // build routes and verbs object
        Object.keys(methodus._descriptors).forEach((itemKey) => {
            const item = methodus._descriptors[itemKey];
            const method = new protobuf.Method(item.propertyKey, 'rpc', '', '');
            service.add(method);
            // const router = service.create((method:any, requestData:any, callback:Function) => { callback(null, protobuf.util.newBuffer(0)); }, true, true);
            //  const method = service.add({ name: item.propertyKey, } as ReflectionObject);
            routerDataObject[item.route] = routerDataObject[item.route] || [];
            routerDataObject[item.route].push(item);
        });

        // Object.keys(routerDataObject).forEach((route: string) => {

        //     //add to protobuff


        //     const autoRouter: any = express.Router();
        //     routerDataObject[route].map((item: any) => {
        //         const verb = item.verb.toLowerCase();
        //         const functionArray = [...globalMiddlewares];
        //         if (item.middlewares) {
        //             item.middlewares.forEach((element: any) => {
        //                 if (element) {
        //                     functionArray.push(element);
        //                 }
        //             });
        //         }

        //         if (obj[item.propertyKey] === undefined) {
        //             console.error(item.propertyKey, obj);
        //         } else {
        //             functionArray.push(obj[item.propertyKey].bind(obj));
        //         }

        //         autoRouter[verb](route, ...functionArray);
        //     });
        //     app.use('/', autoRouter);
        // });
    }
}
