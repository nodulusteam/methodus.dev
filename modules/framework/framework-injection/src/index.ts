import 'reflect-metadata';
import {
    ClassContainer as _ClassContainer,
    ClientContainer as _ClientContainer,
    ServerContainer as _ServerContainer
} from './containers';

import {Injectable as _Injectable, Singleton as _Singleton, Inject as _Inject} from './decorators';
import { DIapi, Injector as _Injector } from './container';
namespace injection {
    export const Injector: DIapi = _Injector;
    export const Inject = _Inject;
    export const Injectable = _Injectable;
    export const Singleton = _Singleton;
    export const ClassContainer = _ClassContainer;
    export const ClientContainer = _ClientContainer;
    export const ServerContainer = _ServerContainer;
}

export default injection;


