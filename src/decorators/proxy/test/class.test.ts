import { MethodConfig, Method, Verbs } from '../../../shim';

@MethodConfig('SimpleClass')
export class SimpleClass {
    @Method(Verbs.Get, '/add')
    public static add(a: number, b: number) {
        return a * b;
    }
}
