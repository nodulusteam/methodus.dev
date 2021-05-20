import { Repo } from '../../';
export declare class UserRole extends Repo<UserRole> {
    _id: string;
    created_at: Date;
    created_by: string;
    level: string;
    name: string;
    order: number;
    role: string;
    constructor(data?: any);
}
