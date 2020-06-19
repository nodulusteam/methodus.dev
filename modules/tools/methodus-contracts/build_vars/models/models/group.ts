import { Repo, Model, Field } from '@methodus/data';

@Model('Group')
export class GroupModel extends Repo<GroupModel> {
    @Field()
    public name: string = '';
}
