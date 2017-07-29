

const excludedProps = ['constructor'];
const debug = require('debug')('methodulus');
import "reflect-metadata";
import { MethodulusConfig, MethodDescriptor, MethodType, ServerType } from '../config';
import { MethodResult, MethodError } from '../response';
import { fp } from '../fp';
import { RestParser, RestResponse, Verbs } from '../rest';



let metadataKey = 'methodulus';
export function MethodConfig(name: string, endpoint?: string) {
    debug('MethodConfig', name, endpoint);
    return function (target: any) {
        let existingMetadata: any = Reflect.getOwnMetadata(metadataKey, target) || {};
        existingMetadata.endpoint = endpoint
        existingMetadata.name = name
        let proto = fp.proto(target);
        proto.methodulus.name = name;
        proto.methodulus.endpoint = endpoint;

        Reflect.defineMetadata(metadataKey, existingMetadata, proto);
        debug('MethodConfig function', existingMetadata);
    }
}
