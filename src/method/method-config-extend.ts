import 'reflect-metadata';
import { ClassContainer } from '../class-container';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfigExtend(extendTarget: any) {
    return (target: any) => {
        const filterKeys = ['length', 'prototype', 'name', 'methodus', 'methodus_base'];
        target.methodus[target.name] = JSON.parse(JSON.stringify(extendTarget.methodus_base));
        Object.getOwnPropertyNames(extendTarget.prototype.constructor).forEach((key) => {
          
            if (filterKeys.indexOf(key) === -1) {
                const func = (...args) => {
                    args.push({ target, instruct: true });
                    extendTarget.prototype.constructor[key].apply(target, args);
                };
                target.prototype.constructor[key] = func.bind(target);
            }
        });
        const mTarget = target.methodus[target.name];
        const routePrefix = target.name.toLocaleLowerCase();
        Object.keys(mTarget._descriptors).forEach((desciptorKey) => {
            const route = mTarget._descriptors[desciptorKey].route;
            mTarget._descriptors[desciptorKey].route = '/' + routePrefix + route;
        });
    };
}
