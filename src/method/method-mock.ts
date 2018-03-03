const excludedProps = ['constructor'];

import 'reflect-metadata';
import { MethodusConfig, MethodDescriptor, MethodType, ServerType, MethodusConfigurations } from '../config';
import { MethodResult, MethodError, MethodEvent } from '../response';
import { Servers } from '../servers/serversList';
import { fp } from '../fp';
import { logger, Log, LogClass } from '../logger';
import { RestParser, RestResponse, Verbs } from '../rest';
import { ClassContainer } from '../class-container';

import { ConfigHelper } from '../decorators/configuration';
const correlator = require('correlation-id');

let methodMetadataKey = 'methodus';
let metadataKey = 'params';

function mergeMetadata(methodus) {
    let config = MethodusConfigurations.get();
    let methodinformation = config.classes.get(methodus.name);
    return Object.assign({}, methodus, methodinformation);
}


/** the @MethodMock decorator registers the model with the odm
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */

export function MethodMock(mockedResult: any) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        var methodus = fp.maybeMethodus(target);
        methodus._mocks = methodus._mocks || {}
        methodus._mocks[propertyKey] = mockedResult;  
        return descriptor;
    }
}

