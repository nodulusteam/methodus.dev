import {
    Injector as _Injector,
    InjectorType as _InjectorType,
    RegistrationTypes as _RegistrationTypes
} from './injector';
import {
    Inject as _Inject,
    Injectable as _Injectable,
    Singleton as _Singleton
} from './decorators';
import {
    ClassContainer as _ClassContainer,
    ClientContainer as _ClientContainer,
    ServerContainer as _ServerContainer
} from './containers';

namespace injection {
    export const Injector = _Injector;
    export const InjectorType = _InjectorType;
    export const RegistrationTypes = _RegistrationTypes;

    export const Inject = _Inject;
    export const Injectable = _Injectable;
    export const Singleton = _Singleton;

    export const ClassContainer = _ClassContainer;
    export const ClientContainer = _ClientContainer;
    export const ServerContainer = _ServerContainer;
}

export default injection;