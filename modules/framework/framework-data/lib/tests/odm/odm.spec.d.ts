import 'reflect-metadata';
import { Repo } from '../../';
export declare class Temp extends Repo<Temp> {
    _id?: string;
    created_at?: Date;
    name?: string;
    constructor(data?: any);
}
export declare class UserRole extends Repo<UserRole> {
    _id?: string;
    created_at?: Date;
    created_by?: string;
    role?: string;
    level?: string;
    name?: string;
    order?: number;
    temp?: Temp;
    constructor(data?: any);
}
