
import { MethodError } from './methodError';

describe('Test MethodError', () => {
    it('createNew', async () => {
        const result = new MethodError({ prop1: 1, prop2: 2 });
        expect(result).not.toBeNull();
    });

    it('createNewMethodErrorWithError', async () => {
        const result = new MethodError(new Error('my errror'));
        expect(result).not.toBeNull();
    });

    it('createNewMethodErrorWithObjectError', async () => {
        const result = new MethodError({ message: 'my-message', error: 'my-message', statusCode: 503 });
        expect(result).not.toBeNull();
    });
});
