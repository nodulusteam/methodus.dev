import 'reflect-metadata';
import { ClassContainer } from '../class-container';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfigExtend(extendTarget: any, name?: string) {
    return (target: any) => {
        const trueName = name || target.name;
        const filterKeys = ['length', 'prototype', 'name', 'methodus', 'methodus_base'];
        target.methodus[trueName] = JSON.parse(JSON.stringify(extendTarget.methodus_base));
        Object.getOwnPropertyNames(extendTarget.prototype.constructor).forEach((key) => {
            if (filterKeys.indexOf(key) === -1) {
                const func = (...args) => {
                    args.push({ target, instruct: true });
                    extendTarget.prototype.constructor[key].apply(target, args);
                };
                Object.defineProperty(target.prototype, 'constructor', func.bind(target))
                // target.prototype.constructor[key] = func.bind(target) ;
            }
        });
        const mTarget = target.methodus[trueName];
        const routePrefix = trueName.toLocaleLowerCase();
        Object.keys(mTarget._descriptors).forEach((desciptorKey) => {
            const route = mTarget._descriptors[desciptorKey].route;
            mTarget._descriptors[desciptorKey].route = '/' + routePrefix + route;
        });
    };
}
