import { Repo, Field, ModelInMemory, Validator } from '@methodus/data';

/**
 * @hidden
 */
@ModelInMemory('Screen')
export class ScreenModel extends Repo<ScreenModel> {

    @Validator.IsNotEmpty()
    @Field()
    public Name?: string;

    @Validator.IsNotEmpty()
    @Field()
    public Type?: string;

    @Validator.IsDate()
    @Field()
    public Date?: Date;

    constructor(model: ScreenModel| any) {
        super(model, ScreenModel);
    }
}
