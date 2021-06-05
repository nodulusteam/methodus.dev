import { Repo, Field, ModelInMemory } from '@methodus/framework-data';

@ModelInMemory('Todo')
export class TodoModel extends Repo<TodoModel> {

    @Field()
    public id: string = '';
    @Field()
    public userId?: string;
    @Field()
    public title?: string;
    @Field()
    public completed: boolean = false;

    constructor(copyData?: any) {
        super(copyData, TodoModel);
    }
}
