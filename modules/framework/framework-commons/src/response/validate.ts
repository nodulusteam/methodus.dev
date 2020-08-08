export async function validate(args: any[]): Promise<boolean | string | string[]> {
    let validations: string[] = [];
    for (let arg of args) {
        if (arg && arg.validate) {
            const validationInner = await arg.validate(arg);
            if (validationInner) {
                validations = validations.concat(validationInner);
            }
        }
    }
    return (!validations.length) ? false : true;
}