import * as express from 'express';
import { fp } from '../../fp';
import { logger, LogClass } from '../../log';
import { MethodType,Verbs } from '../../';
import 'reflect-metadata';


@LogClass(logger)
export class ExpressEventBus {
    public router: any;
    constructor(obj: any, methodType: MethodType) {
        let proto = fp.maybeProto(obj);
        let methodus = fp.maybeMethodus(obj);
        //let collection = Object.getOwnPropertyNames(proto);
        let autoRouter = express.Router();
        Object.keys(methodus._events).forEach(itemKey => {
            let item = methodus._events[itemKey];
            switch (item.verb) {
                case Verbs.Get:
                    autoRouter.get(item.route, proto[item.propertyKey].bind(obj));
                    break;
                case Verbs.Post:
                    autoRouter.post(item.route, proto[item.propertyKey].bind(obj));

                    break;
                case Verbs.Delete:
                    autoRouter.delete(item.route, proto[item.propertyKey].bind(obj));

                    break;
                case Verbs.Head:
                    autoRouter.head(item.route, proto[item.propertyKey].bind(obj));

                    break;
                case Verbs.Put:
                    autoRouter.put(item.route, proto[item.propertyKey].bind(obj));

                    break;
            }
        });

        this.router = autoRouter;
    }


}
