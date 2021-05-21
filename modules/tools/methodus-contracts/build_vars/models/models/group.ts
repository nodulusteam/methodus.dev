import { Repo, Model, Field } from '@methodus/framework-data';

@Model('Group')
export class GroupModel extends Repo<GroupModel> {
    @Field()
    public name: string = '';
}
