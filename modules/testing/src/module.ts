import { Injector } from '@methodus/server';
export class Module {
    get<T>(name: string) {
        return Injector.get(name) as T;
    }
}
