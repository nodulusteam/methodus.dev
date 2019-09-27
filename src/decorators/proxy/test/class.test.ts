import { MethodConfig, Method, Verbs } from '../../../shim';

@MethodConfig('ProxiedClass')
export class ProxiedClass {
    @Method(Verbs.Get, '/add')
    public static add(a: number, b: number) {
        return a * b;
    }
}
