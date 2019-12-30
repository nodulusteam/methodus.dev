export async function validate(args: any[]): Promise<boolean | string | string[]> {
    const validations = [];
    for (let arg of args) {
        if (arg && arg.odm && arg.validate) {
            const validationInner = await arg.validate(arg);
            validations.push(validationInner)

        }
    }
    return (!validations.length) ? false : validations;
}