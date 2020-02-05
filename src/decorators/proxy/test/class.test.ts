import { MethodConfig, Method, } from '../../../shim';


@MethodConfig('ProxiedClass')
export class ProxiedClass {
    @Method('GET', '/add')
    public static add(a: number, b: number) {
        return a * b;
    }
}
