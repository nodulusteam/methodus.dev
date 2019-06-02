import { logger, LogClass } from '../../log';
import * as express from 'express';
import { fp } from '../../fp';
import { MethodType } from '../../shim';

@LogClass(logger)
export class ExpressRouter {
    public routers: any = [];
    constructor(obj: any, methodType: MethodType, app: any) {

        const methodus = fp.maybeMethodus(obj)[obj.name];

        const proto = fp.maybeProto(obj);
        const globalMiddlewares: any[] = [];
        if (methodus.middlewares) {
            methodus.middlewares.forEach((element: any) => {
                if (element) {
                    globalMiddlewares.push(element);
                } else {
                    logger.error('could not load middleware');
                }
            });
        }

        const routerDataObject: any = {};
        // build routes and verbs object
        Object.keys(methodus._descriptors).forEach((itemKey) => {
            const item = methodus._descriptors[itemKey];
            routerDataObject[item.route] = routerDataObject[item.route] || [];
            routerDataObject[item.route].push(item);
        });

        Object.keys(routerDataObject).forEach((route: string) => {
            const autoRouter: any = express.Router();
            routerDataObject[route].map((item: any) => {
                const verb = item.verb.toLowerCase();
                const functionArray = [...globalMiddlewares];
                if (item.middlewares) {
                    logger.info( `loading middleware for ${item.propertyKey}`);
                    item.middlewares.forEach((element: any) => {
                        if (element) {
                            functionArray.push(element);
                        }
                    });
                }

                const repositoryBuilder = (...args: any[]) => {
                    args.push(methodus.repository);
                    proto[item.propertyKey].apply(methodus, args);
                };

                if (methodus.repository) {
                    functionArray.push(repositoryBuilder.bind(methodus));
                } else {
                    functionArray.push(proto[item.propertyKey].bind(methodus));

                }

                autoRouter[verb](route, ...functionArray);
            });
            app.use('/', autoRouter);
        });
    }
}
