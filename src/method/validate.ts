export async function validate(args: any[]): Promise<boolean | string | string[]> {
    const validations = [];
    for (let arg of args) {
        if (arg && arg.validate) {
            const validationInner = await arg.validate(arg);
            if (validationInner) {
                validations.push(validationInner);
            }
        }
    }
    return (!validations.length) ? false : validations;
}