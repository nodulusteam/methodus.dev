import { MethodConfig, Method, } from '../../../shim';
import { Verbs } from '@methodus/platform-express';

@MethodConfig('ProxiedClass')
export class ProxiedClass {
    @Method(Verbs.Get, '/add')
    public static add(a: number, b: number) {
        return a * b;
    }
}
