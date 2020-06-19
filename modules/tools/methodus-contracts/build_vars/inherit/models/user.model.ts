import { Repo, Model, Field } from '@methodus/data';

@Model('User')
export class UserModel extends Repo<UserModel> {

    @Field()
    public firstName: string = '';

    @Field()
    public lastName: string = '';

}
