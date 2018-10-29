import { logger,  LogClass } from '../../log';
import * as express from 'express';
import { fp } from '../../fp';
import { MethodType } from '../../index';


@LogClass(logger)
export class ExpressRouter {
    public routers: any = [];
    constructor(obj: any, methodType: MethodType, app: any) {
        let methodus = fp.maybeMethodus(obj);
        let proto = fp.maybeProto(obj);


        const globalMiddlewares = [];
        if (methodus.middlewares) {
            methodus.middlewares.forEach(element => {
                if (element) {
                    globalMiddlewares.push(element);
                } else {
                    logger.error(this, 'could not load middleware');
                }

            });
        }

        const routerDataObject = {};
        //build routes and verbs object
        Object.keys(methodus._descriptors).forEach(itemKey => {
            let item = methodus._descriptors[itemKey];
            routerDataObject[item.route] = routerDataObject[item.route] || [];
            routerDataObject[item.route].push(item);
        });


        Object.keys(routerDataObject).forEach((route: string) => {

            const autoRouter = express.Router();
            routerDataObject[route].map((item) => {

                let verb = item.verb.toLowerCase();
                let functionArray = [...globalMiddlewares];
                if (item.middlewares) {
                    logger.info(this, `loading middleware for ${item.propertyKey}`)
                    item.middlewares.forEach(element => {
                        if (element) {
                            functionArray.push(element);
                        }
                    });
                }
                functionArray.push(proto[item.propertyKey].bind(obj));
                autoRouter[verb](route, ...functionArray)
            });
            app.use('/', autoRouter);
        });
    }
}
