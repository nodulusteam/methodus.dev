import { Repo } from '../../';
export declare class User extends Repo<User> {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    last_login_date: Date;
    primary_phone: string;
    created_at: Date;
    company_id: string;
    created_by: string;
    role_id: string;
    email: string;
    attUID: string;
    _company_id: string;
    id_old: string;
    constructor(data?: any);
}
