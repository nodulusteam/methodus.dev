import { Model, Field, Virtual, Lookup, ObjectId, IsoDate, ReturnType, Transform, Repo } from '../../';


@Model('Company', Transform.Automatic)
export class Company extends Repo<Company> {


    @Field('id')
    public _id: string

    @Field('_id')
    public id: string;

    @Field()
    public name: string

    @Field()
    public email: string

    @Field()
    public created_by: string
    constructor(data?) {
        super(data, Company);
    }

}
