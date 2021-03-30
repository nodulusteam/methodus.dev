import {MethodType, Verbs} from './enums';
import {ParamsMap} from './params-map';
export class MethodDescriptor {
    public verb?: Verbs;
    public route?: string;
    public methodType?: MethodType;
    public propertyKey?: string;
    public middlewares?: any;
    public params?: ParamsMap[];
}
