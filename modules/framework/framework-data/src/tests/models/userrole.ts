import { Model, Repo, Field, Virtual, Lookup, ObjectId, IsoDate, ReturnType, Transform } from '../../';



@Model('UserRole')
export class UserRole extends Repo<UserRole> {
    @ObjectId()
    @Field('_id')
    public _id: string;

    @Field()
    public created_at: Date;

    @Field()
    public created_by: string;

    @ObjectId()
    @Field()
    public level: string;


    @Field()
    public name: string;


    @Field()
    public order: number;


    @Field()
    public role: string;

    constructor(data?: any) {
        super(data, UserRole);
    };
}
