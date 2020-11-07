import { Model, Field, Validator } from '@methodus/data';

@Model('UserModel')
export class UserModel {
    @Validator.IsNotEmpty()
    @Validator.IsEmail({}, {
        message: "Title is too short"
    })
    @Field()
    public Email?: string;

    public async validate(item) {
        const result = await Validator.validate(item);
        if (result.length > 0) {
            const constraints = result.map((item2) => {
                return Object.values(item2.constraints).join(';');
            })
            return constraints.join(';');
        }
        return false;
    }
    constructor(data: any) {
        this.Email = data.Email;
    }
}