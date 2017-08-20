const excludedProps = ['constructor'];
const debug = require('debug')('methodulus');
const path = require('path');
const fs = require('fs');

import "reflect-metadata";

const metadataKey = 'methodulus';


export function Proxify(target: any) {
    let proxy = { name: target.name, methods: [] };
    let proto = target.prototype || target.__proto__;
    let methodulus: any = proto.methodulus;// Reflect.getOwnMetadata(metadataKey, target);
    let proxyString: string[] = [];

    proxyString.push(`
        import { logger, Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, Event, EventName } from 'methodulus';

        @MethodConfig('${methodulus.name}')
        export class ${methodulus.name} {
            constructor() { }
            `)

    for (let method in methodulus._descriptors) {
        proxy[method] = { information: method, method: proto[method].toString() };
        let methodulusConfiguration = methodulus._descriptors[method];

        let paramsMap: any[] = Reflect.getOwnMetadata('params', target, method) || [];
        paramsMap.sort((a, b) => {
            return a.index - b.index;
        })

        let theString = `
        @Method(Verbs.${methodulusConfiguration.verb}, '${methodulusConfiguration.route}')
        public ${method}() {
            
            
            
        }`;
        proxyString.push(theString);
    }





    proxyString.push(`}`)

    fs.writeFileSync('./proxy.ts', proxyString.join('\n'));

    //  console.log(proxy);
    //get the metadata


}



