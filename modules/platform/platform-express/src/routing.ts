import * as express from 'express';
import injection from '@methodus/server/injection';
import commons, { MethodType } from '@methodus/server/commons';



export class ExpressRouter {
    public routers: any = [];
    public globalMiddlewares: any[] = [];
    constructor(obj: any, methodType: MethodType, app: any) {

        let keyName = obj.name;
        if (!keyName) {
            keyName = obj.constructor.name;
        }
        obj = injection.Injector.resolve(keyName);

        const methodus = commons.util.maybeMethodus(obj)[keyName];
        if (methodus.middlewares) {
            methodus.middlewares.forEach((element: any) => {
                if (element) {
                    this.globalMiddlewares.push(element);
                }
            });
        }

        const routerDataObject: any = {};
        // build routes and verbs object
        Object.keys(methodus._descriptors).forEach((itemKey) => {
            const item = methodus._descriptors[itemKey];
            const routeKey = methodus.prefix ? methodus.prefix + item.route : item.route;
            routerDataObject[routeKey] = routerDataObject[routeKey] || [];
            routerDataObject[routeKey].push(item);
        });

        Object.keys(routerDataObject).forEach((route: string) => {
            const autoRouter: any = express.Router();
            routerDataObject[route].map((item: any) => {
                if (!item.verb) {
                    throw `Validation error, missing Verb ${JSON.stringify(item)}`;
                }
                const verb = item.verb.toLowerCase();
                const functionArray = [...this.globalMiddlewares];
                if (item.middlewares) {
                    item.middlewares.forEach((element: any) => {
                        if (element) {
                            functionArray.push(element);
                        }
                    });
                }

                if (obj[item.propertyKey] === undefined) {
                    console.error(item.propertyKey, obj);
                } else {
                    functionArray.push(obj[item.propertyKey].bind(obj));
                }

                autoRouter[verb](route, ...functionArray);
            });
            app.use('/', autoRouter);
        });
    }
}
