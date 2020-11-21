import 'reflect-metadata';
import { container } from 'tsyringe';

export interface DIapi {
    resolve<T = any>(token: string | any): T;
    register<T = any>(token: string | any, target: unknown): void;
    registerInstance(token: string, target: unknown): void;
}


let bridge = { Injector: container };
if (global) {
    if (!(global as any).METHODUS_DI) {
        (global as any).METHODUS_DI = bridge;
    }
    bridge = (global as any).METHODUS_DI;
}

if (!bridge.Injector) {
    bridge.Injector = container;
}

// export const Injector: InjectorType = bridge.Injector;


export const Injector: DIapi = bridge.Injector;
