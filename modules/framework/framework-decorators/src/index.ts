import {
    ClientConfiguration as _ClientConfiguration,
    PluginConfiguration as _PluginConfiguration,
    RouterConfiguration as _RouterConfiguration,
    ServerConfiguration as _ServerConfiguration,
} from './class';
import {
    Module as _Module,
    ModuleConfiguration as _ModuleConfiguration,
} from './module';
import { Auth as _Auth } from './auth';
import { Proxy as _Proxy } from './proxy/proxy';
import {
    Method as _Method,
    MethodPipe as _MethodPipe,
    MethodConfig as _MethodConfig,
    MethodMock as _MethodMock,
} from './method';

export namespace framework.decorators {
    export const Method = _Method;
    export const MethodPipe = _MethodPipe;
    export const MethodConfig = _MethodConfig;
    export const MethodMock = _MethodMock;
    export const Proxy = _Proxy;

    export const Auth = _Auth;
    export const ModuleConfiguration = _ModuleConfiguration;
    export const Module = _Module;
    export const ClientConfiguration = _ClientConfiguration;
    export const PluginConfiguration = _PluginConfiguration;
    export const RouterConfiguration = _RouterConfiguration;
    export const ServerConfiguration = _ServerConfiguration;
}

export default framework.decorators;
export * from './proxy/proxy';
export * from './auth';
export * from './module';
export * from './class';
export * from './method';
