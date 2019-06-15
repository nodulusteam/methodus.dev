import { Verbs } from '../verbs';
import { MethodType } from '../interfaces';

/**
 * @hidden
 */
export interface MethodDescriptor {
    verb: Verbs;
    route: string;
    methodType: MethodType;
    propertyKey: string;
    middlewares?: any;
    params: any[];
}

/**
 * @hidden
 */
export interface EventDescriptor extends MethodDescriptor {
    name: string;
    value?: any;
    exchange?: string;
}
