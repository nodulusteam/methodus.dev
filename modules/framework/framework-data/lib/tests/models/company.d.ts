import { Repo } from '../../';
export declare class Company extends Repo<Company> {
    _id: string;
    id: string;
    name: string;
    email: string;
    created_by: string;
    constructor(data?: any);
}
