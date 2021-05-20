import { truncate } from 'fs';
import 'reflect-metadata';
import { validate } from './validate';

class ObjectWithValidator {
    validate() {
        return truncate;
    }
}

describe('Validate', () => {
    it('validate', async () => {
        validate([new ObjectWithValidator()]);
    });
});
