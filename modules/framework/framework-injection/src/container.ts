import { container } from 'tsyringe';

export interface DIapi {
    resolve<T = any>(token: string): T;
    registerSingleton(token: string, target: unknown): void;
    registerInstance(token: string, target: unknown): void;
}

export const Injector: DIapi = container;
