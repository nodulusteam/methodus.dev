import { Model, Repo, Field, Virtual, Lookup, ObjectId, IsoDate, ReturnType, Transform } from '../../';



@Model('User')
export class User extends Repo<User> {
    @ObjectId()
    @Field('_id')
    public _id: string;
    @Field('username')
    public username: string;
    @Field('first_name')
    public first_name: string;
    @Field('last_name')
    public last_name: string;
    @Field('last_login_date')
    public last_login_date: Date;
    @Field('primary_phone')
    public primary_phone: string;
    @Field('created_at')
    public created_at: Date;
    @Field('company_id')
    public company_id: string;
    @Field('created_by')
    public created_by: string;
    @Field('role_id')
    public role_id: string;
    @Field('email')
    public email: string;
    @Field('attUID')
    public attUID: string;
    @Field('_company_id')
    public _company_id: string;
    @Field('id_old')
    public id_old: string;
    constructor(data?: any) {
        super(data, User);
    };
}
