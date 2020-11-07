import 'reflect-metadata';
import {
    ClassContainer as _ClassContainer,
    ClientContainer as _ClientContainer,
    ServerContainer as _ServerContainer
} from './containers';

import {
    // Inject as _Inject,
    Injectable as _Injectable,
    Singleton as _Singleton
} from './decorators';
import { DIapi, Injector as _Injector } from './container';
import { inject } from 'tsyringe';
namespace injection {
    export const Injector: DIapi = _Injector;
    // export const InjectorType = _InjectorType;
    // export const RegistrationTypes = _RegistrationTypes;
    export const Inject = inject;
    export const Injectable = _Injectable;
    export const Singleton = _Singleton;
    export const ClassContainer = _ClassContainer;
    export const ClientContainer = _ClientContainer;
    export const ServerContainer = _ServerContainer;
}

export default injection;


