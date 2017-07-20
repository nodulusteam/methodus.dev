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
    for (let method in methodulus._descriptors) {
        proxy[method] = { information: method, method: proto[method].toString() };
    }


    console.log(proxy);
    //get the metadata


}



