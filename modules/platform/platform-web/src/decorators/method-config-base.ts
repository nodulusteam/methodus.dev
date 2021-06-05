import { Injector } from '../di';

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfigBase(name: string) {
    return (target: any) => {
        // //use the injectable logic here
       //use the injectable logic here
       Injector.inject(target, name);

       let proto = target.prototype || target.__proto__;

       if (target.methodus) { // means its a static class , no prototype
           proto = target;
       }
       proto._symbol = name;

       proto.methodus[name] = proto.methodus[name] || { _auth: {}, _events: {}, _descriptors: {} };
       proto.methodus[name].name = name;
       proto.methodus[name].isBase = true;

       const methods = Object.getOwnPropertyNames(target.prototype);
       methods.forEach((methodName: string): void => {
           return target.prototype[methodName];
       });   
    };
}
