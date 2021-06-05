import * as _Validator from 'class-validator';

export async function validate(item) {
    const result = await _Validator.validate(item);
    if (result.length > 0) {
        return result;
    }
    return false;
}
