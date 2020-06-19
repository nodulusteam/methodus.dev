import { Repo, Field, ModelInMemory } from '@methodus/data';

/**
 * @hidden
 */
@ModelInMemory('Screen')
export class ScreenModel extends Repo<ScreenModel> {
    @Field()
    public Name?: string;

    @Field()
    public Type?: string;

    @Field()
    public Date?: Date;

    constructor() {
        super(null as any, ScreenModel);
    }
}
